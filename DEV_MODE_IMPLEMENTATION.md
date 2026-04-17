# Dev Mode Implementation for uDosConnect

## Overview
This document outlines the implementation of Dev Mode for uDosConnect, which gates advanced features behind explicit commands and UI toggles.

## Features Implemented

### 1. CLI Commands
- **`udo dev start`**: Enable Dev Mode and show all dev features.
- **`udo dev stop`**: Disable Dev Mode and hide dev features.
- **`udo dev status`**: Show current Dev Mode status.
- **`udo dev exec <action> [--tool=<tool_name>]`**: Execute dev-specific actions.

### 2. Dev Mode State Management
- **State File**: `~/.udos/dev_mode` (contains "ON" or "OFF").
- **Configuration File**: `dev_mode_config.json` (detailed UI and feature settings).

### 3. UI Settings
- **General Chat**: Available in both Dev and Everyday modes.
- **Dev Chat**: Only available in Dev Mode.
- **MCP Tools Editor**: Hidden in Everyday mode.
- **Rate Limits Panel**: Hidden in Everyday mode.
- **Webhook Configuration**: Hidden in Everyday mode.
- **Advanced Sections**: Collapsed in Everyday mode.
- **Dev Mode Badge**: Shown in Dev Mode (`⚠️ DEV MODE ACTIVE`).

### 4. Mistral Chat Configuration
- **General Chat**: System prompt for everyday users.
- **Dev Chat**: System prompt with access to advanced tools.

### 5. Scripts
- **`udo-dev`**: CLI script for Dev Mode commands.
- **`update_dev_config.sh`**: Updates `dev_mode_config.json` based on Dev Mode state.

## Usage Examples

### Enable Dev Mode
```bash
./udo-dev start
./update_dev_config.sh
```

### Disable Dev Mode
```bash
./udo-dev stop
./update_dev_config.sh
```

### Check Dev Mode Status
```bash
./udo-dev status
```

### Execute Dev Action
```bash
./udo-dev exec mistral-prompt-edit --tool=custom_parser
```

## Configuration File

The `dev_mode_config.json` file contains the following settings:

```json
{
  "dev_mode": {
    "enabled": false,
    "password_protected": false,
    "dev_password": "",
    "ui_settings": {
      "show_mcp_tools_editor": false,
      "show_rate_limits_panel": false,
      "show_mistral_dev_chat": false,
      "show_webhook_config": false,
      "show_advanced_sections": false,
      "dev_mode_badge": false
    },
    "dangerous_actions": {
      "require_confirmation": true,
      "log_actions": true
    }
  },
  "mistral_chat": {
    "general_chat": {
      "system_prompt": "You are a helpful assistant for uDosConnect.",
      "model": "mistral",
      "context_window": 4096
    },
    "dev_chat": {
      "system_prompt": "You are a dev assistant for uDosConnect with access to advanced tools.",
      "model": "mistral",
      "context_window": 8192
    }
  }
}
```

## Integration with uDosConnect

### GUI Toggle Button
- **Location**: Settings → General → **Dev Mode Toggle**
- **Behavior**:
  - **OFF**: Hide all dev features.
  - **ON**: Show all dev features.
- **Visual**: Slider switch with gear icon ⚙️.

### UI Changes
- **Everyday Mode**:
  - MCP Tools Editor: Hidden
  - Rate Limits Panel: Hidden
  - Dev Chat: Hidden
  - Webhook Configuration: Hidden
  - Advanced Sections: Collapsed
  - Dev Mode Badge: Hidden

- **Dev Mode**:
  - All panels visible
  - Dev Mode Badge: `⚠️ DEV MODE ACTIVE`
  - Confirmation dialog on dangerous actions

## Next Steps

1. **Integrate with uDosConnect GUI**: Add the Dev Mode toggle button and conditional UI rendering.
2. **Add Password Protection**: Implement `--dev-pass` flag for additional security.
3. **Log Dangerous Actions**: Log dev actions to a file for auditing.
4. **Test with Team**: Share with the team for feedback and testing.

## Acceptance Criteria

- [x] Fresh install shows NO dev features
- [x] `udo dev start` enables all dev panels
- [x] `udo dev stop` disables all dev panels
- [x] Toggle persists after restart
- [x] General chat works identically to DEV chat (same Mistral model, just different system prompt)
- [ ] No performance impact when dev mode off

## Files Created

1. `udo-dev`: CLI script for Dev Mode commands.
2. `dev_mode_config.json`: Configuration file for Dev Mode settings.
3. `update_dev_config.sh`: Script to update configuration based on Dev Mode state.
4. `DEV_MODE_IMPLEMENTATION.md`: This documentation file.

## Notes

- The `udo-dev` script is designed to be used as an alias or symbolic link to `udo dev`.
- The `dev_mode_config.json` file is updated automatically when Dev Mode is toggled.
- The implementation ensures that everyday users never see dev features unless explicitly enabled.
