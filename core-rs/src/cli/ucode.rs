use anyhow::{Context, Result};
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

use crate::ucode::UCodeRuntime;

pub fn run_file(path: &Path) -> Result<()> {
    let code = fs::read_to_string(path).with_context(|| format!("read {}", path.display()))?;
    run_source(&code)
}

pub fn run_eval(code: &str) -> Result<()> {
    run_source(code)
}

fn run_source(code: &str) -> Result<()> {
    let mut rt = UCodeRuntime::new();
    let out = rt.execute(code)?;
    print!("{out}");
    Ok(())
}

pub fn fmt_path(path: &Path, check: bool) -> Result<()> {
    if path.is_file() {
        return fmt_one_file(path, check);
    }
    if path.is_dir() {
        let mut count = 0usize;
        for entry in WalkDir::new(path).min_depth(1).max_depth(8) {
            let entry = entry?;
            let p = entry.path();
            if p.is_file() && p.extension().is_some_and(|e| e == "ucode") {
                fmt_one_file(p, check)?;
                count += 1;
            }
        }
        if count == 0 {
            println!("fmt: no .ucode files under {}", path.display());
        }
        return Ok(());
    }
    anyhow::bail!("not found: {}", path.display())
}

fn fmt_one_file(path: &Path, check: bool) -> Result<()> {
    let original =
        fs::read_to_string(path).with_context(|| format!("read {}", path.display()))?;
    let formatted = normalize_ucode(&original);
    if check {
        if original != formatted {
            anyhow::bail!("would reformat: {}", path.display());
        }
        return Ok(());
    }
    if original != formatted {
        fs::write(path, &formatted).with_context(|| format!("write {}", path.display()))?;
        println!("formatted {}", path.display());
    }
    Ok(())
}

fn normalize_ucode(input: &str) -> String {
    let lines: Vec<&str> = input.lines().collect();
    let trimmed: Vec<String> = lines.iter().map(|l| l.trim_end().to_string()).collect();
    let mut out = trimmed.join("\n");
    if !out.is_empty() && !out.ends_with('\n') {
        out.push('\n');
    } else if out.is_empty() {
        return String::new();
    }
    out
}
