package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/fredporter/uDosConnect/modules/uos/internal/launch"
)

func main() {
	if len(os.Args) < 2 {
		printHelp()
		os.Exit(2)
	}
	switch os.Args[1] {
	case "apps":
		if len(os.Args) < 3 || os.Args[2] != "list" {
			fmt.Fprintln(os.Stderr, "usage: uos apps list")
			os.Exit(2)
		}
		if err := cmdAppsList(); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
	case "launch":
		if err := cmdLaunch(os.Args[2:]); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
	default:
		printHelp()
		os.Exit(2)
	}
}

func printHelp() {
	fmt.Print(`uos - external app launcher (scaffold)

Commands:
  uos apps list
  uos launch <app> (--dry-run | --execute) [--] [args...]
`)
}

func cmdAppsList() error {
	appsDir := launch.AppsDir()
	entries, err := os.ReadDir(appsDir)
	if err != nil {
		// repo dev fallback (go run cwd is often modules/uos)
		wd, err2 := os.Getwd()
		if err2 != nil {
			return err
		}
		fallback := filepath.Join(wd, "apps")
		entries, err = os.ReadDir(fallback)
		if err != nil {
			fallback = filepath.Join(wd, "modules", "uos", "apps")
			entries, err = os.ReadDir(fallback)
			if err != nil {
				return err
			}
		}
		appsDir = fallback
	}
	for _, e := range entries {
		if e.IsDir() {
			continue
		}
		if strings.HasSuffix(strings.ToLower(e.Name()), ".obx") {
			fmt.Println(strings.TrimSuffix(e.Name(), filepath.Ext(e.Name())))
		}
	}
	return nil
}

func cmdLaunch(args []string) error {
	if len(args) < 1 {
		return fmt.Errorf("usage: uos launch <app> (--dry-run | --execute) [--] [args...]")
	}
	app := args[0]
	rest := args[1:]
	dry := false
	execute := false
	var passthrough []string
	sawSep := false
	for _, a := range rest {
		if !sawSep && a == "--dry-run" {
			dry = true
			continue
		}
		if !sawSep && a == "--execute" {
			execute = true
			continue
		}
		if !sawSep && a == "--" {
			sawSep = true
			continue
		}
		passthrough = append(passthrough, a)
	}
	if dry && execute {
		return fmt.Errorf("pass only one of --dry-run or --execute")
	}
	if !dry && !execute {
		return fmt.Errorf("choose --dry-run (print invocation) or --execute (run docker/podman)")
	}
	if dry {
		return launch.DryRunDocker(app, passthrough)
	}
	return launch.RunContainer(app, passthrough)
}
