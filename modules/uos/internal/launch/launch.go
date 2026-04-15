package launch

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/fredporter/uDosConnect/modules/uos/internal/manifest"
)

func uosHome() string {
	if v := os.Getenv("UOS_HOME"); v != "" {
		return v
	}
	home, _ := os.UserHomeDir()
	return filepath.Join(home, ".local", "share", "uos")
}

func AppsDir() string {
	return filepath.Join(uosHome(), "apps")
}

func ManifestPath(app string) string {
	return filepath.Join(AppsDir(), app+".obx")
}

func RepoFallbackManifestPath(app string) (string, error) {
	here, err := os.Getwd()
	if err != nil {
		return "", err
	}
	// When `go run` cwd is modules/uos, examples live in ./apps.
	// When cwd is repo root, examples live in modules/uos/apps.
	candidates := []string{
		filepath.Join(here, "apps", app+".obx"),
		filepath.Join(here, "modules", "uos", "apps", app+".obx"),
	}
	for _, c := range candidates {
		if st, err := os.Stat(c); err == nil && !st.IsDir() {
			return c, nil
		}
	}
	return "", fmt.Errorf("manifest not found for app %q", app)
}

func DryRunDocker(app string, passthroughArgs []string) error {
	p := ManifestPath(app)
	if _, err := os.Stat(p); err != nil {
		fallback, ferr := RepoFallbackManifestPath(app)
		if ferr != nil {
			return ferr
		}
		p = fallback
	}

	_, body, err := manifest.LoadOBX(p)
	if err != nil {
		return err
	}

	cmd := pickCommand(body, passthroughArgs)
	cmd = expandSimplePlaceholders(cmd, passthroughArgs)

	fmt.Printf("app: %s\n", app)
	fmt.Printf("manifest: %s\n", p)
	fmt.Printf("container: %s image=%s runtime=%s\n", body.Container.Type, body.Container.Image, body.Container.Runtime)
	fmt.Printf("command: %s\n\n", cmd)

	switch strings.ToLower(strings.TrimSpace(body.Container.Type)) {
	case "docker":
		args := dockerRunArgs(body, cmd)
		fmt.Println("docker " + strings.Join(args, " "))
		return nil
	case "podman":
		args := podmanRunArgs(body, cmd)
		fmt.Println("podman " + strings.Join(args, " "))
		return nil
	default:
		return fmt.Errorf("dry-run only supports docker|podman for now (got %q)", body.Container.Type)
	}
}

func pickCommand(body *manifest.BodyModel, passthroughArgs []string) string {
	if strings.TrimSpace(body.Commands.Default) != "" {
		return body.Commands.Default
	}
	for _, e := range body.Commands.CLI {
		if strings.Contains(e.Pattern, "{file}") && len(passthroughArgs) > 0 {
			return e.Command
		}
	}
	if len(body.Commands.CLI) > 0 {
		return body.Commands.CLI[0].Command
	}
	return ""
}

func expandSimplePlaceholders(cmd string, passthroughArgs []string) string {
	cmd = strings.ReplaceAll(cmd, "{cwd}", func() string { wd, _ := os.Getwd(); return wd }())
	if strings.Contains(cmd, "{file}") && len(passthroughArgs) > 0 {
		cmd = strings.ReplaceAll(cmd, "{file}", passthroughArgs[0])
	}
	cmd = strings.ReplaceAll(cmd, "{display}", os.Getenv("DISPLAY"))
	cmd = strings.ReplaceAll(cmd, "{wayland}", os.Getenv("WAYLAND_DISPLAY"))
	cmd = strings.ReplaceAll(cmd, "{runtime_dir}", os.Getenv("XDG_RUNTIME_DIR"))
	return cmd
}

func dockerRunArgs(body *manifest.BodyModel, command string) []string {
	args := []string{"run", "--rm", "--name", sanitizeName(body)}
	if body.Resources.CPU > 0 {
		args = append(args, "--cpus", fmt.Sprintf("%d", body.Resources.CPU))
	}
	if strings.TrimSpace(body.Resources.Memory) != "" {
		args = append(args, "--memory", body.Resources.Memory)
	}
	if body.Resources.GPU {
		args = append(args, "--gpus", "all")
	}
	if os.Getenv("DISPLAY") != "" {
		args = append(args, "-e", "DISPLAY="+os.Getenv("DISPLAY"))
		args = append(args, "-v", "/tmp/.X11-unix:/tmp/.X11-unix")
	}
	if os.Getenv("WAYLAND_DISPLAY") != "" && os.Getenv("XDG_RUNTIME_DIR") != "" {
		args = append(args, "-e", "WAYLAND_DISPLAY="+os.Getenv("WAYLAND_DISPLAY"))
		args = append(args, "-e", "XDG_RUNTIME_DIR="+os.Getenv("XDG_RUNTIME_DIR"))
		args = append(args, "-v", os.Getenv("XDG_RUNTIME_DIR")+":"+os.Getenv("XDG_RUNTIME_DIR"))
	}
	for _, m := range body.Volumes {
		ro := ""
		if m.Readonly {
			ro = ":ro"
		}
		host := expandHome(m.Host)
		args = append(args, "-v", host+":"+m.Container+ro)
	}
	args = append(args, body.Container.Image)
	args = append(args, strings.Fields(command)...)
	return args
}

func podmanRunArgs(body *manifest.BodyModel, command string) []string {
	args := dockerRunArgs(body, command)
	// podman supports --replace for dev iteration; harmless for one-shot runs.
	out := []string{"run", "--rm", "--replace"}
	out = append(out, args[2:]...)
	return out
}

func sanitizeName(body *manifest.BodyModel) string {
	if strings.TrimSpace(body.Container.Image) != "" {
		base := filepath.Base(strings.Split(body.Container.Image, ":")[0])
		return strings.ReplaceAll(base, "/", "-")
	}
	return "uos-app"
}

func expandHome(p string) string {
	if strings.HasPrefix(p, "~/") {
		home, _ := os.UserHomeDir()
		return filepath.Join(home, strings.TrimPrefix(p, "~/"))
	}
	return p
}
