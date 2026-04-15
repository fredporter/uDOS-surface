use assert_cmd::Command;
use std::io::Write;
use tempfile::NamedTempFile;

#[test]
fn run_eval_prints_output() {
    let output = Command::cargo_bin("udos-core")
        .expect("binary")
        .args(["run", "--eval", r#"PRINT "hello""#])
        .output()
        .expect("run");
    assert!(output.status.success(), "stderr={}", String::from_utf8_lossy(&output.stderr));
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("hello"), "stdout={stdout:?}");
}

#[test]
fn run_file_executes() {
    let mut tmp = NamedTempFile::new().expect("tmp");
    writeln!(tmp, r#"PRINT "from-file""#).expect("write");
    let path = tmp.path().to_path_buf();

    let output = Command::cargo_bin("udos-core")
        .expect("binary")
        .args(["run", "--file"])
        .arg(&path)
        .output()
        .expect("run");
    assert!(output.status.success(), "stderr={}", String::from_utf8_lossy(&output.stderr));
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("from-file"), "stdout={stdout:?}");
}

#[test]
fn fmt_trims_and_writes_newline() {
    let mut tmp = NamedTempFile::with_suffix(".ucode").expect("tmp");
    write!(tmp, "PRINT \"x\"   \n  \n").expect("write");
    let path = tmp.path().to_path_buf();

    let output = Command::cargo_bin("udos-core")
        .expect("binary")
        .args(["fmt"])
        .arg(&path)
        .output()
        .expect("fmt");
    assert!(output.status.success(), "stderr={}", String::from_utf8_lossy(&output.stderr));

    let content = std::fs::read_to_string(&path).expect("read");
    assert!(!content.contains("   "));
    assert!(content.ends_with('\n'));
}

#[test]
fn fmt_check_fails_when_would_change() {
    let mut tmp = NamedTempFile::with_suffix(".ucode").expect("tmp");
    write!(tmp, "PRINT \"y\"   ").expect("write");
    let path = tmp.path().to_path_buf();

    let output = Command::cargo_bin("udos-core")
        .expect("binary")
        .args(["fmt", "--check"])
        .arg(&path)
        .output()
        .expect("fmt");
    assert!(!output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("would reformat") || stderr.contains("reformat"), "{stderr}");
}
