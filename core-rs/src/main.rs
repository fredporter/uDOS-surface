#![allow(dead_code)]

mod cli;
mod github;
mod mcp;
mod obf;
mod orchestrator;
mod rexpaint;
mod server;
mod teletext;
mod ucode;
mod usxd;
mod vault;

use anyhow::Result;
use clap::{Parser, Subcommand, ValueEnum};
use std::path::PathBuf;

#[derive(Parser, Debug)]
#[command(name = "udo")]
#[command(about = "uDos core CLI (Rust rewrite)", long_about = None)]
struct Args {
    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand, Debug)]
enum Command {
    /// Initialize a vault layout
    Init {
        #[arg(long)]
        path: Option<PathBuf>,
    },
    /// List vault files
    List {
        #[arg(long)]
        path: Option<PathBuf>,
        #[arg(long)]
        depth: Option<usize>,
    },
    /// Open a file in $EDITOR
    Open {
        path: PathBuf,
    },
    /// Delete file (moves to .compost)
    Delete {
        path: PathBuf,
    },
    /// Restore from .compost by id
    Restore {
        id: String,
        #[arg(long)]
        path: Option<PathBuf>,
    },
    /// Search vault text
    Search {
        query: String,
        #[arg(long)]
        path: Option<PathBuf>,
    },
    /// USXD command group
    Usxd {
        #[command(subcommand)]
        command: UsxdCommand,
    },
    /// Grid/REXPaint bridge commands
    Grid {
        #[command(subcommand)]
        command: GridCommand,
    },
    /// ASCII / Teletext bridge commands
    Teletext {
        #[command(subcommand)]
        command: TeletextCommand,
    },
    /// FIGlet / ASCII art helpers (external `figlet` binary)
    Ascii {
        #[command(subcommand)]
        command: AsciiCommand,
    },
    /// Always-on uDosServer controls
    Server {
        #[command(subcommand)]
        command: ServerCommand,
    },
    /// Unified markdown pipeline commands (Remark)
    Md {
        #[command(subcommand)]
        command: MdCommand,
    },
    /// OK Handler MCP router commands
    Mcp {
        #[command(subcommand)]
        command: McpCommand,
    },
    /// Agent and hivemind commands
    Agent {
        #[command(subcommand)]
        command: AgentCommand,
    },
    /// Personality engine commands
    Personality {
        #[command(subcommand)]
        command: PersonalityCommand,
    },
    /// Chat commands
    Chat {
        #[arg(long, default_value = "bro")]
        personality: String,
        #[arg(long, default_value_t = false)]
        history: bool,
        prompt: Option<String>,
    },
    /// Workflow manager commands
    Workflow {
        #[command(subcommand)]
        command: WorkflowCommand,
    },
    /// Run uCode (mini runtime; file or `--eval`)
    Run {
        #[arg(short = 'f', long)]
        file: Option<PathBuf>,
        #[arg(short = 'e', long)]
        eval: Option<String>,
    },
    /// Format `.ucode` files (trim trailing whitespace; ensure final newline)
    Fmt {
        path: PathBuf,
        #[arg(long, default_value_t = false)]
        check: bool,
    },
    /// Internal daemon entrypoint (hidden)
    #[command(hide = true, name = "__server-daemon")]
    ServerDaemon,
}

#[derive(Subcommand, Debug)]
enum UsxdCommand {
    /// Render USXD JSON/YAML in terminal mode
    Render {
        file: PathBuf,
        #[arg(long, value_enum, default_value_t = RenderModeArg::Teletext)]
        mode: RenderModeArg,
    },
}

#[derive(Clone, Debug, Copy, ValueEnum)]
enum RenderModeArg {
    Teletext,
    Mono,
    Wireframe,
}

#[derive(Subcommand, Debug)]
enum GridCommand {
    /// Import .xp to .obf
    Import {
        file: PathBuf,
        #[arg(long)]
        out: Option<PathBuf>,
    },
    /// Export .obf to .xp
    Export {
        file: PathBuf,
        #[arg(long, default_value = "xp")]
        format: String,
        #[arg(long)]
        out: Option<PathBuf>,
    },
}

#[derive(Subcommand, Debug)]
enum AsciiCommand {
    /// Print a banner via FIGlet (or boxed fallback)
    Banner {
        text: String,
        #[arg(long, default_value = "standard")]
        font: String,
        #[arg(long, default_value_t = false)]
        to_teletext: bool,
    },
    /// Font helpers
    Fonts {
        #[command(subcommand)]
        command: AsciiFontsCommand,
    },
}

#[derive(Subcommand, Debug)]
enum AsciiFontsCommand {
    /// List available fonts (`showfigfonts` or font directory)
    List,
    /// A1 stub — document manual `.flf` install
    Install {
        name: String,
    },
    /// Preview text in a named font
    Preview {
        #[arg(long)]
        font: String,
        text: String,
    },
}

#[derive(Subcommand, Debug)]
enum TeletextCommand {
    /// Convert ascii text into teletext hex stream
    Convert {
        file: PathBuf,
        #[arg(long)]
        output: Option<PathBuf>,
    },
    /// Render teletext stream in terminal
    Render {
        file: PathBuf,
        #[arg(long, default_value = "terminal")]
        mode: String,
    },
    /// Render OBF-like grid text into teletext hex stream
    Grid {
        #[command(subcommand)]
        command: TeletextGridCommand,
    },
}

#[derive(Subcommand, Debug)]
enum TeletextGridCommand {
    /// Convert grid source to teletext stream
    Render {
        file: PathBuf,
        #[arg(long)]
        output: Option<PathBuf>,
    },
}

#[derive(Subcommand, Debug)]
enum ServerCommand {
    /// Start background service
    Start,
    /// Stop background service
    Stop,
    /// Show service status
    Status,
    /// Show service logs
    Logs,
    /// Run MCP in stdio mode (A1)
    McpStdio,
}

#[derive(Subcommand, Debug)]
enum McpCommand {
    Start,
    List,
    Call {
        tool: String,
        #[arg(long, default_value = "{}")]
        params: String,
    },
}

#[derive(Subcommand, Debug)]
enum AgentCommand {
    Query { prompt: String },
    Hivemind { prompt: String },
    Status,
    Rankings,
}

#[derive(Subcommand, Debug)]
enum PersonalityCommand {
    List,
    Set { name: String },
}

#[derive(Subcommand, Debug)]
enum WorkflowCommand {
    List,
    Add {
        #[arg(long)]
        schedule: String,
        #[arg(long)]
        task: String,
        #[arg(long, default_value = "normal")]
        priority: String,
    },
    QueueStatus,
    Retry {
        #[arg(long = "failed-id")]
        failed_id: String,
    },
}

#[derive(Subcommand, Debug)]
enum MdCommand {
    /// Format markdown in place
    Format { file: PathBuf },
    /// Lint markdown
    Lint { file: PathBuf },
    /// Generate table of contents output
    Toc { file: PathBuf },
    /// Render markdown to html or teletext
    Render {
        file: PathBuf,
        #[arg(long, default_value = "html")]
        format: String,
        #[arg(long)]
        output: Option<PathBuf>,
        #[arg(long, default_value_t = false)]
        terminal: bool,
    },
    /// Extract frontmatter from markdown
    Frontmatter { file: PathBuf },
    /// Validate internal markdown links
    Check { file: PathBuf },
    /// Verify Node.js and remark-pipeline dependencies
    Doctor,
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    let args = Args::parse();

    match args.command {
        Command::Init { path } => cli::vault::init_vault(path.as_deref())?,
        Command::List { path, depth } => cli::vault::list_vault(path.as_deref(), depth)?,
        Command::Open { path } => cli::vault::open_file(&path)?,
        Command::Delete { path } => cli::vault::delete_file(&path)?,
        Command::Restore { id, path } => cli::vault::restore_file(path.as_deref(), &id)?,
        Command::Search { query, path } => cli::vault::search_vault(path.as_deref(), &query)?,
        Command::Usxd { command } => match command {
            UsxdCommand::Render { file, mode } => {
                let mode = match mode {
                    RenderModeArg::Teletext => cli::usxd::ModeArg::Teletext,
                    RenderModeArg::Mono => cli::usxd::ModeArg::Mono,
                    RenderModeArg::Wireframe => cli::usxd::ModeArg::Wireframe,
                };
                cli::usxd::render(&file, mode)?
            }
        },
        Command::Grid { command } => match command {
            GridCommand::Import { file, out } => {
                let out_path = cli::grid::import_xp(&file, out.as_deref())?;
                println!("Imported {}", out_path.display());
            }
            GridCommand::Export { file, format, out } => {
                if format != "xp" {
                    anyhow::bail!("unsupported format: {format} (only xp is supported in A1)");
                }
                let out_path = cli::grid::export_obf_to_xp(&file, out.as_deref())?;
                println!("Exported {}", out_path.display());
            }
        },
        Command::Teletext { command } => match command {
            TeletextCommand::Convert { file, output } => {
                let out = cli::teletext::convert(&file, output.as_deref())?;
                println!("Converted {}", out.display());
            }
            TeletextCommand::Render { file, mode } => {
                let rendered = cli::teletext::render(&file, &mode)?;
                println!("{rendered}");
            }
            TeletextCommand::Grid { command } => match command {
                TeletextGridCommand::Render { file, output } => {
                    let out = cli::teletext::grid_render(&file, output.as_deref())?;
                    println!("Grid rendered {}", out.display());
                }
            },
        },
        Command::Ascii { command } => match command {
            AsciiCommand::Banner {
                text,
                font,
                to_teletext,
            } => cli::ascii::banner(&text, &font, to_teletext)?,
            AsciiCommand::Fonts { command } => match command {
                AsciiFontsCommand::List => cli::ascii::fonts_list()?,
                AsciiFontsCommand::Install { name } => cli::ascii::fonts_install(&name)?,
                AsciiFontsCommand::Preview { font, text } => {
                    cli::ascii::fonts_preview(&font, &text)?
                }
            },
        },
        Command::Server { command } => match command {
            ServerCommand::Start => cli::server::start()?,
            ServerCommand::Stop => cli::server::stop()?,
            ServerCommand::Status => cli::server::status()?,
            ServerCommand::Logs => cli::server::logs()?,
            ServerCommand::McpStdio => cli::server::mcp_stdio()?,
        },
        Command::Md { command } => match command {
            MdCommand::Format { file } => cli::md::format(&file.to_string_lossy())?,
            MdCommand::Lint { file } => cli::md::lint(&file.to_string_lossy())?,
            MdCommand::Toc { file } => cli::md::toc(&file.to_string_lossy())?,
            MdCommand::Render {
                file,
                format,
                output,
                terminal,
            } => {
                let file_s = file.to_string_lossy().to_string();
                let out_s = output.map(|x| x.to_string_lossy().to_string());
                cli::md::render(&file_s, &format, out_s.as_deref(), terminal)?
            }
            MdCommand::Frontmatter { file } => cli::md::frontmatter(&file.to_string_lossy())?,
            MdCommand::Check { file } => cli::md::check(&file.to_string_lossy())?,
            MdCommand::Doctor => cli::md::doctor()?,
        },
        Command::ServerDaemon => {
            server::run_daemon_loop().await?;
        }
        Command::Mcp { command } => match command {
            McpCommand::Start => cli::mcp::start()?,
            McpCommand::List => cli::mcp::list()?,
            McpCommand::Call { tool, params } => cli::mcp::call(&tool, &params)?,
        },
        Command::Agent { command } => match command {
            AgentCommand::Query { prompt } => cli::agent::query(&prompt)?,
            AgentCommand::Hivemind { prompt } => cli::agent::hivemind(&prompt)?,
            AgentCommand::Status => cli::agent::status()?,
            AgentCommand::Rankings => cli::agent::rankings()?,
        },
        Command::Personality { command } => match command {
            PersonalityCommand::List => cli::personality::list()?,
            PersonalityCommand::Set { name } => cli::personality::set(&name)?,
        },
        Command::Chat {
            personality,
            history,
            prompt,
        } => {
            if history {
                cli::chat::history()?;
            } else {
                let p = prompt.unwrap_or_else(|| "hello".to_string());
                cli::chat::run(&personality, &p)?;
            }
        }
        Command::Workflow { command } => match command {
            WorkflowCommand::List => cli::workflow::list()?,
            WorkflowCommand::Add {
                schedule,
                task,
                priority,
            } => cli::workflow::add(&schedule, &task, &priority)?,
            WorkflowCommand::QueueStatus => cli::workflow::queue_status()?,
            WorkflowCommand::Retry { failed_id } => cli::workflow::retry(&failed_id)?,
        },
        Command::Run { file, eval } => match (&file, &eval) {
            (Some(path), None) => cli::ucode::run_file(path)?,
            (None, Some(code)) => cli::ucode::run_eval(code)?,
            (Some(_), Some(_)) => anyhow::bail!("pass either --file or --eval, not both"),
            (None, None) => anyhow::bail!("usage: udo run --file <path.ucode> | udo run --eval <snippet>"),
        },
        Command::Fmt { path, check } => cli::ucode::fmt_path(&path, check)?,
    }

    Ok(())
}
