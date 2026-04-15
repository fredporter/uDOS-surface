use crate::mcp::registry;
use anyhow::{Context, Result};
use serde_json::{json, Value};
use std::io::{self, BufRead, Write};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpListener;

pub struct UDosMcpServer;

impl UDosMcpServer {
    pub fn new() -> Self {
        Self
    }

    pub fn run_stdio(&self) -> Result<()> {
        let stdin = io::stdin();
        let mut stdout = io::stdout();
        for line in stdin.lock().lines() {
            let line = line?;
            if line.trim().is_empty() {
                continue;
            }
            let req: Value = serde_json::from_str(&line)
                .with_context(|| "invalid JSON request line for stdio MCP")?;
            let id = req.get("id").cloned().unwrap_or(json!(null));
            let method = req
                .get("method")
                .and_then(Value::as_str)
                .unwrap_or("unknown");
            let params = req.get("params").cloned().unwrap_or(json!({}));
            let result = registry::handle_tool_call(method, params)
                .unwrap_or_else(|e| json!({ "ok": false, "error": e.to_string() }));
            let resp = json!({ "id": id, "result": result });
            writeln!(stdout, "{}", resp)?;
            stdout.flush()?;
        }
        Ok(())
    }

    pub async fn run_http(&self, port: u16) -> Result<()> {
        let listener = TcpListener::bind(("0.0.0.0", port)).await?;
        loop {
            let (mut socket, _) = listener.accept().await?;
            tokio::spawn(async move {
                let mut buf = vec![0u8; 8192];
                if let Ok(n) = socket.read(&mut buf).await {
                    if n == 0 {
                        return;
                    }
                    let req = String::from_utf8_lossy(&buf[..n]).to_string();
                    let body = req.split("\r\n\r\n").nth(1).unwrap_or("").trim();
                    let parsed: Value = serde_json::from_str(body).unwrap_or_else(|_| json!({}));
                    let method = parsed
                        .get("method")
                        .and_then(Value::as_str)
                        .unwrap_or("unknown");
                    let params = parsed.get("params").cloned().unwrap_or(json!({}));
                    let result = registry::handle_tool_call(method, params)
                        .unwrap_or_else(|e| json!({ "ok": false, "error": e.to_string() }));
                    let body = json!({ "result": result }).to_string();
                    let response = format!(
                        "HTTP/1.1 200 OK\r\ncontent-type: application/json\r\ncontent-length: {}\r\n\r\n{}",
                        body.len(),
                        body
                    );
                    let _ = socket.write_all(response.as_bytes()).await;
                }
            });
        }
    }
}
