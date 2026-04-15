use anyhow::{anyhow, Context, Result};
use std::path::{Path, PathBuf};
use std::process::Command;

fn remark_cli_path() -> &'static str {
    "/Users/fredbook/Code/uDosConnect/modules/remark-pipeline/src/cli.mjs"
}

fn remark_pipeline_root() -> PathBuf {
    Path::new(remark_cli_path())
        .parent()
        .and_then(|p| p.parent())
        .map(Path::to_path_buf)
        .unwrap_or_else(|| PathBuf::from("/Users/fredbook/Code/uDosConnect/modules/remark-pipeline"))
}

/// Monorepo root (`…/uDosConnect`) when the pipeline lives under `modules/remark-pipeline`.
fn monorepo_root() -> Option<PathBuf> {
    let root = remark_pipeline_root();
    root.parent()?.parent().map(Path::to_path_buf)
}

fn node_modules_ok(root: &Path) -> (bool, &'static str) {
    let local = root.join("node_modules");
    if local.is_dir() {
        return (true, "package-local");
    }
    if let Some(mono) = monorepo_root() {
        let hoisted = mono.join("node_modules");
        if hoisted.is_dir() {
            return (true, "workspace-hoisted");
        }
    }
    (false, "")
}

/// Verify Node, pipeline script, and npm dependencies for `do md *`.
pub fn doctor() -> Result<()> {
    let script = Path::new(remark_cli_path());
    let root = remark_pipeline_root();
    let pkg_json = root.join("package.json");
    println!("uDos remark pipeline — environment check\n");

    let mut ok = true;

    match Command::new("node").arg("--version").output() {
        Err(e) => {
            println!("  [FAIL] node: not runnable ({e})");
            println!("         Install Node.js LTS, then re-run: do md doctor");
            ok = false;
        }
        Ok(out) if !out.status.success() => {
            println!("  [FAIL] node: exited with status {}", out.status);
            ok = false;
        }
        Ok(out) => {
            let ver = String::from_utf8_lossy(&out.stdout).trim().to_string();
            println!("  [ OK ] node: {ver}");
        }
    }

    if script.is_file() {
        println!("  [ OK ] pipeline script: {}", script.display());
    } else {
        println!("  [FAIL] pipeline script missing: {}", script.display());
        ok = false;
    }

    if pkg_json.is_file() {
        println!("  [ OK ] package.json: {}", pkg_json.display());
    } else {
        println!("  [FAIL] package.json missing: {}", pkg_json.display());
        ok = false;
    }

    let (nm_ok, nm_kind) = node_modules_ok(&root);
    if nm_ok {
        println!("  [ OK ] node_modules: present ({nm_kind})");
    } else {
        println!(
            "  [FAIL] node_modules: not found under {} or workspace root",
            root.display()
        );
        ok = false;
    }

    let import_ok = nm_ok
        && Command::new("node")
            .current_dir(&root)
            .args([
                "--input-type=module",
                "-e",
                "import('unified').then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); })",
            ])
            .status()
            .map(|s| s.success())
            .unwrap_or(false);

    if import_ok {
        println!("  [ OK ] ESM import: unified loads");
    } else if nm_ok {
        println!("  [FAIL] ESM import: could not load `unified` (broken or incomplete install)");
        ok = false;
    } else {
        println!("  [SKIP] ESM import: skipped (install dependencies first)");
    }

    println!();
    if !ok {
        let fix_dir = monorepo_root().unwrap_or_else(|| root.clone());
        println!(
            "Fix: cd {} && npm install\nThen: do md doctor",
            fix_dir.display()
        );
        return Err(anyhow!("remark pipeline environment incomplete"));
    }

    println!("All checks passed. `do md format|lint|…` is ready.");
    Ok(())
}

fn run_remark(args: &[&str]) -> Result<()> {
    let script = remark_cli_path();
    if !Path::new(script).exists() {
        return Err(anyhow!(
            "remark pipeline not found at {} (run workspace sync)",
            script
        ));
    }
    let status = Command::new("node")
        .arg(script)
        .args(args)
        .status()
        .with_context(|| "failed to execute node remark pipeline")?;
    if !status.success() {
        return Err(anyhow!("remark pipeline exited non-zero"));
    }
    Ok(())
}

pub fn format(path: &str) -> Result<()> {
    run_remark(&["format", path])
}

pub fn lint(path: &str) -> Result<()> {
    run_remark(&["lint", path])
}

pub fn toc(path: &str) -> Result<()> {
    run_remark(&["toc", path])
}

pub fn render(path: &str, format: &str, output: Option<&str>, terminal: bool) -> Result<()> {
    let mut args = vec!["render", path, "--format", format];
    if let Some(out) = output {
        args.push("--output");
        args.push(out);
    }
    if terminal {
        args.push("--terminal");
    }
    run_remark(&args)
}

pub fn frontmatter(path: &str) -> Result<()> {
    run_remark(&["frontmatter", path])
}

pub fn check(path: &str) -> Result<()> {
    run_remark(&["check", path])
}
