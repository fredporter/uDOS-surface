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
        let stdout = io::stdout();
        let mut reader = io::BufReader::new(stdin.lock());
        let mut writer = io::BufWriter::new(stdout.lock());

        loop {
            let message = match read_framed_message(&mut reader)? {
                Some(msg) => msg,
                None => break,
            };

            let req: Value = match serde_json::from_str(&message) {
                Ok(v) => v,
                Err(e) => {
                    let err = jsonrpc_error(Value::Null, -32700, "Parse error", Some(json!(e.to_string())));
                    write_framed_message(&mut writer, &err)?;
                    continue;
                }
            };

            let id = req.get("id").cloned();
            let method = req.get("method").and_then(Value::as_str);
            let params = req.get("params").cloned().unwrap_or_else(|| json!({}));

            let resp = match method {
                Some("initialize") => {
                    jsonrpc_result(
                        id.unwrap_or(Value::Null),
                        json!({
                            "protocolVersion": "2024-11-05",
                            "serverInfo": { "name": "udos-core", "version": env!("CARGO_PKG_VERSION") },
                            "capabilities": { "tools": {} }
                        }),
                    )
                }
                Some("notifications/initialized") => {
                    // Notification: no response body required.
                    continue;
                }
                Some("ping") => jsonrpc_result(id.unwrap_or(Value::Null), json!({})),
                Some("tools/list") => {
                    let tools = registry::default_tools()
                        .into_iter()
                        .map(|tool| {
                            json!({
                                "name": tool.name,
                                "description": format!("{} [{}]", tool.description, tool.status),
                                "inputSchema": {
                                    "type": "object",
                                    "additionalProperties": true
                                }
                            })
                        })
                        .collect::<Vec<_>>();
                    jsonrpc_result(id.unwrap_or(Value::Null), json!({ "tools": tools }))
                }
                Some("tools/call") => {
                    let name = params.get("name").and_then(Value::as_str);
                    let args = params
                        .get("arguments")
                        .cloned()
                        .unwrap_or_else(|| json!({}));
                    match name {
                        Some(tool_name) => {
                            let tool_out = registry::handle_tool_call(tool_name, args)
                                .unwrap_or_else(|e| json!({ "ok": false, "error": e.to_string() }));
                            let is_error = tool_out.get("ok").and_then(Value::as_bool) == Some(false);
                            jsonrpc_result(
                                id.unwrap_or(Value::Null),
                                json!({
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": serde_json::to_string_pretty(&tool_out).unwrap_or_else(|_| tool_out.to_string())
                                        }
                                    ],
                                    "structuredContent": tool_out,
                                    "isError": is_error
                                }),
                            )
                        }
                        None => jsonrpc_error(
                            id.unwrap_or(Value::Null),
                            -32602,
                            "Invalid params: tools/call requires `name`",
                            None,
                        ),
                    }
                }
                Some(other) => {
                    jsonrpc_error(
                        id.unwrap_or(Value::Null),
                        -32601,
                        &format!("Method not found: {other}"),
                        None,
                    )
                }
                None => jsonrpc_error(
                    id.unwrap_or(Value::Null),
                    -32600,
                    "Invalid Request: missing `method`",
                    None,
                ),
            };

            write_framed_message(&mut writer, &resp)?;
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

fn read_framed_message<R: BufRead>(reader: &mut R) -> Result<Option<String>> {
    let mut content_length: Option<usize> = None;
    let mut header_line = String::new();

    loop {
        header_line.clear();
        let bytes = reader.read_line(&mut header_line)?;
        if bytes == 0 {
            return Ok(None);
        }
        let line = header_line.trim_end_matches(['\r', '\n']);
        if line.is_empty() {
            break;
        }
        let lower = line.to_ascii_lowercase();
        if let Some(rest) = lower.strip_prefix("content-length:") {
            content_length = Some(
                rest.trim()
                    .parse::<usize>()
                    .with_context(|| format!("invalid Content-Length header: {line}"))?,
            );
        }
    }

    let len = content_length.context("missing Content-Length header")?;
    let mut buf = vec![0u8; len];
    reader.read_exact(&mut buf)?;
    Ok(Some(String::from_utf8(buf).context("invalid UTF-8 message body")?))
}

fn write_framed_message<W: Write>(writer: &mut W, body: &Value) -> Result<()> {
    let payload = body.to_string();
    write!(writer, "Content-Length: {}\r\n\r\n{}", payload.len(), payload)?;
    writer.flush()?;
    Ok(())
}

fn jsonrpc_result(id: Value, result: Value) -> Value {
    json!({
        "jsonrpc": "2.0",
        "id": id,
        "result": result
    })
}

fn jsonrpc_error(id: Value, code: i64, message: &str, data: Option<Value>) -> Value {
    json!({
        "jsonrpc": "2.0",
        "id": id,
        "error": {
            "code": code,
            "message": message,
            "data": data
        }
    })
}
