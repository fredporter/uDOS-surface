#!/bin/bash
# uDosConnect GUI Launcher - Works on both Linux and Mac
# Enhanced with self-healing, monitoring, and logging

UDOS_ROOT="${UDOS_ROOT:-$HOME/Code/uDosConnect}"
GUI_PORT="${GUI_PORT:-5174}"
LOG_FILE="$HOME/.udos/gui.log"
PID_FILE="$HOME/.udos/gui.pid"
MONITOR_INTERVAL=30
MAX_RETRIES=3

# Ensure log directory exists
mkdir -p "$HOME/.udos"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# Check if port is available
port_in_use() {
    lsof -i :$GUI_PORT > /dev/null 2>&1
    return $?
}

# Kill conflicting processes
kill_conflicting() {
    log "Checking for port conflicts on $GUI_PORT..."
    if port_in_use; then
        log "Port $GUI_PORT is in use. Attempting to kill conflicting processes..."
        pkill -f ":$GUI_PORT" 2>/dev/null
        pkill -f "python.*$GUI_PORT" 2>/dev/null
        pkill -f "node.*$GUI_PORT" 2>/dev/null
        sleep 2
        if port_in_use; then
            log "⚠️  Could not free port $GUI_PORT. Trying alternative port..."
            GUI_PORT=$((GUI_PORT + 1))
            log "Using alternative port: $GUI_PORT"
        else
            log "✅ Port $GUI_PORT freed successfully"
        fi
    fi
}

# Monitor server health
monitor_server() {
    log "🔍 Monitoring server health..."
    local retry_count=0
    
    while [ $retry_count -lt $MAX_RETRIES ]; do
        if ! port_in_use; then
            log "❌ Server crashed. Restarting... (attempt $((retry_count + 1)) of $MAX_RETRIES)"
            start_gui
            retry_count=$((retry_count + 1))
        else
            sleep $MONITOR_INTERVAL
        fi
    done
    
    if [ $retry_count -eq $MAX_RETRIES ]; then
        log "❌ Server failed to stay alive after $MAX_RETRIES attempts. Giving up."
        stop_gui
    fi
}

start_gui() {
    cd "$UDOS_ROOT"
    
    # Start API server first
    log "Starting GUI API server on port 5175..."
    cd tools/gui-api
    npm start > "$HOME/.udos/gui-api.log" 2>&1 &
    API_PID=$!
    echo "$API_PID" > "$HOME/.udos/gui-api.pid"
    log "✅ API server started (PID: $API_PID)"
    cd "$UDOS_ROOT"
    
    # Kill conflicting processes first
    kill_conflicting
    
    # Check if we have a static build
    if [ -d "dist" ] && [ -f "dist/index.html" ]; then
        log "Starting static server on port $GUI_PORT..."
        if command -v python3 &> /dev/null; then
            python3 -m http.server $GUI_PORT --directory dist > "$LOG_FILE" 2>&1 &
        elif command -v python &> /dev/null; then
            python -m SimpleHTTPServer $GUI_PORT > "$LOG_FILE" 2>&1 &
        elif command -v npx &> /dev/null; then
            npx serve dist -l $GUI_PORT > "$LOG_FILE" 2>&1 &
        fi
    elif [ -f "package.json" ]; then
        log "Starting dev server on port $GUI_PORT..."
        npm run dev -- --port $GUI_PORT > "$LOG_FILE" 2>&1 &
    else
        # Create minimal static index
        log "Creating minimal static index..."
        mkdir -p dist
        create_minimal_index
        python3 -m http.server $GUI_PORT --directory dist > "$LOG_FILE" 2>&1 &
    fi
    
    # Store PID
    echo $! > "$PID_FILE"
    log "✅ GUI started on http://localhost:$GUI_PORT (PID: $(cat $PID_FILE))"
    
    # Open browser
    sleep 2
    open "http://localhost:$GUI_PORT" 2>/dev/null || xdg-open "http://localhost:$GUI_PORT" 2>/dev/null
    
    # Start monitoring in background
    monitor_server &
}

create_minimal_index() {
    cat > dist/index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>uDosConnect - Vibe Control Center</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: #00ff9d;
            min-height: 100vh;
            padding: 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            font-size: 3rem;
            background: linear-gradient(135deg, #00ff9d, #00b4d8);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 1rem;
        }
        .status { 
            background: rgba(0,255,157,0.1);
            border-left: 4px solid #00ff9d;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .card {
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            padding: 1.5rem;
            transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.08); }
        .card h3 { color: #00b4d8; margin-bottom: 1rem; }
        .card a {
            color: #00ff9d;
            text-decoration: none;
            display: inline-block;
            margin-top: 1rem;
            border-bottom: 1px solid transparent;
        }
        .card a:hover { border-bottom-color: #00ff9d; }
        .terminal {
            background: #0a0a0a;
            padding: 1rem;
            border-radius: 8px;
            font-family: monospace;
            margin: 1rem 0;
        }
        .command {
            color: #ffd700;
            cursor: pointer;
        }
        .command:hover { text-decoration: underline; }
        .badge {
            display: inline-block;
            background: #00ff9d;
            color: #0a0a0a;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 uDosConnect Vibe Control Center</h1>
        <div class="status">
            ✅ System Online | Vibe Engine Active | GUI v2.0
        </div>
        
        <div class="card-grid">
            <div class="card">
                <h3>🌀 Vibe TUI</h3>
                <p>Launch the Mistral Vibe terminal interface for AI-assisted development.</p>
                <a href="#" onclick="execCommand('udo vibe'); return false;">🚀 Launch Vibe →</a>
            </div>
            
            <div class="card">
                <h3>📁 Vault Access</h3>
                <p>Browse and manage your uDos vault content.</p>
                <a href="#" onclick="execCommand('udo list'); return false;">📂 List Vault →</a>
            </div>
            
            <div class="card">
                <h3>🌐 GitHub Integration</h3>
                <p>Sync, PRs, issues, and release management.</p>
                <a href="#" onclick="execCommand('udo github status'); return false;">🔄 Check Status →</a>
            </div>
            
            <div class="card">
                <h3>🎨 USXD Renderer</h3>
                <p>Preview themes and export surfaces.</p>
                <a href="#" onclick="execCommand('udo usxd list'); return false;">🎭 List Themes →</a>
            </div>
            
            <div class="card">
                <h3>⚙️ Workflow Engine</h3>
                <p>Manage automated workflows and schedules.</p>
                <a href="#" onclick="execCommand('udo workflow list'); return false;">📋 View Workflows →</a>
            </div>
            
            <div class="card">
                <h3>🔌 MCP Bridge</h3>
                <p>Model Context Protocol server status.</p>
                <a href="#" onclick="execCommand('udo a2 status'); return false;">🔍 Check Bridge →</a>
            </div>
        </div>
        
        <div class="terminal">
            <div>🎯 Quick Commands:</div>
            <div><span class="command" onclick="copyCommand('udo vibe --model mistral-large')">$ udo vibe --model mistral-large</span></div>
            <div><span class="command" onclick="copyCommand('udo gui demos')">$ udo gui demos</span></div>
            <div><span class="command" onclick="copyCommand('udo publish preview')">$ udo publish preview</span></div>
            <div><span class="command" onclick="copyCommand('udo usxd serve')">$ udo usxd serve</span></div>
        </div>
        
        <div style="margin-top: 2rem; text-align: center; font-size: 0.875rem; opacity: 0.7;">
            <span class="badge">DEV MODE</span> 
            <span class="badge">VIBE INTEGRATED</span>
            <span class="badge">MCP READY</span>
        </div>
    </div>
    
    <script>
        function execCommand(cmd) {
            fetch('/api/exec', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({command: cmd})
            }).then(r => r.json()).then(data => {
                alert('Command sent: ' + cmd + '\nCheck terminal for output');
            });
        }
        
        function copyCommand(cmd) {
            navigator.clipboard.writeText(cmd);
            alert('Copied: ' + cmd);
        }
    </script>
</body>
</html>
HTML
}

stop_gui() {
    # Stop API server first
    if [ -f "$HOME/.udos/gui-api.pid" ]; then
        log "Stopping API server..."
        kill $(cat "$HOME/.udos/gui-api.pid") 2>/dev/null
        rm "$HOME/.udos/gui-api.pid" 2>/dev/null
    fi
    
    if [ -f "$PID_FILE" ]; then
        log "Stopping GUI server..."
        kill $(cat "$PID_FILE") 2>/dev/null
        rm "$PID_FILE" 2>/dev/null
        
        # Kill any remaining processes
        pkill -f "http.server.*$GUI_PORT" 2>/dev/null
        pkill -f "python.*$GUI_PORT" 2>/dev/null
        pkill -f "node.*$GUI_PORT" 2>/dev/null
        
        log "✅ GUI stopped"
    else
        log "⚠️  No PID file found. GUI may not be running."
    fi
}

case "${1:-start}" in
    start) 
        log "Starting GUI launcher..."
        start_gui
        ;;
    stop) 
        stop_gui
        ;;
    restart) 
        log "Restarting GUI..."
        stop_gui
        sleep 1
        start_gui
        ;;
    status)
        if port_in_use; then
            echo "✅ GUI running on http://localhost:$GUI_PORT"
            if [ -f "$PID_FILE" ]; then
                echo "PID: $(cat $PID_FILE)"
            fi
        else
            echo "❌ GUI not running"
        fi
        ;;
    logs)
        if [ -f "$LOG_FILE" ]; then
            tail -50 "$LOG_FILE"
        else
            echo "No logs found"
        fi
        ;;
    *) 
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo "  start    - Start GUI server with monitoring"
        echo "  stop     - Stop GUI server"
        echo "  restart  - Restart GUI server"
        echo "  status   - Check if GUI is running"
        echo "  logs     - Show recent logs"
        ;;
esac
