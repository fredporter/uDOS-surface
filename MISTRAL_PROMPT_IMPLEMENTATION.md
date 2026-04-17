# Mistral Prompt Engineering Implementation

## Overview
This document outlines the implementation of the `mistral-prompt-edit` action for uDosConnect's Dev Mode. The implementation allows developers to adjust Mistral's prompt settings, including context window, temperature, and system messages.

## Files Created

### 1. `udo/core/mistral.py`
- **Type**: Python Module
- **Purpose**: Core module for managing Mistral prompt configurations.
- **Features**:
  - `MistralConfig` class for managing configurations.
  - Functions for editing, getting, and resetting prompt settings.
  - Persistence to `~/.udos/mistral_config.json`.

### 2. `udo/core/__init__.py`
- **Type**: Python Module
- **Purpose**: Core module for executing DevOnly actions.
- **Features**:
  - `execute_dev_action` function to route DevOnly actions.
  - Integration with `mistral-prompt-edit`, `mistral-prompt-get`, and `mistral-prompt-reset`.

### 3. `udo/cli/commands/exec.py`
- **Type**: Python Module
- **Purpose**: CLI command for executing DevOnly actions.
- **Features**:
  - Handles `mistral-prompt-edit`, `mistral-prompt-get`, and `mistral-prompt-reset` actions.
  - Validates Dev Mode is active before executing actions.

### 4. `udo/cli/utils/state.py`
- **Type**: Python Module
- **Purpose**: State management for Dev Mode.
- **Features**:
  - `enable_dev_mode`, `disable_dev_mode`, `check_dev_mode`, and `get_dev_config` functions.
  - Persistence to `~/.udos/dev_mode`.

### 5. `udo/cli/utils/safety.py`
- **Type**: Python Module
- **Purpose**: Safety checks for Dev Mode actions.
- **Features**:
  - `confirm_action` function for user confirmation.
  - `validate_password` function for password protection.

### 6. `udo/cli/commands/start.py`
- **Type**: Python Module
- **Purpose**: CLI command for enabling Dev Mode.
- **Features**:
  - Handles `udo dev start` command.
  - Optional password protection.

### 7. `udo/cli/commands/stop.py`
- **Type**: Python Module
- **Purpose**: CLI command for disabling Dev Mode.
- **Features**:
  - Handles `udo dev stop` command.

### 8. `udo/cli/commands/status.py`
- **Type**: Python Module
- **Purpose**: CLI command for checking Dev Mode status.
- **Features**:
  - Handles `udo dev status` command.
  - Returns JSON with Dev Mode status and password protection status.

### 9. `udo/cli/dev_mode.py`
- **Type**: Python Module
- **Purpose**: Main CLI group for Dev Mode commands.
- **Features**:
  - Groups `start`, `stop`, `status`, and `exec` commands.

### 10. `udo/cli/__init__.py`
- **Type**: Python Module
- **Purpose**: Main CLI entry point.
- **Features**:
  - Groups `dev` command.

### 11. `test_cli.py`
- **Type**: Python Script
- **Purpose**: Test script for the CLI.
- **Features**:
  - Adds `udo` directory to Python path.
  - Runs the CLI.

## Usage Examples

### Enable Dev Mode
```bash
./test_cli.py dev start
```

### Edit Mistral Prompt
```bash
./test_cli.py dev exec mistral-prompt-edit --args '{"context_window": 8192, "temperature": 0.7}'
```

### Get Mistral Prompt Configuration
```bash
./test_cli.py dev exec mistral-prompt-get
```

### Reset Mistral Prompt Configuration
```bash
./test_cli.py dev exec mistral-prompt-reset
```

### Check Dev Mode Status
```bash
./test_cli.py dev status
```

### Disable Dev Mode
```bash
./test_cli.py dev stop
```

## Testing

### Test 1: Enable Dev Mode
```bash
./test_cli.py dev start
```
**Expected Output**:
```
✅ Dev Mode activated.
```

### Test 2: Edit Mistral Prompt
```bash
./test_cli.py dev exec mistral-prompt-edit --args '{"context_window": 8192, "temperature": 0.7}'
```
**Expected Output**:
```json
{
  "status": "success",
  "changes": {
    "context_window": 8192,
    "temperature": 0.7
  }
}
```

### Test 3: Get Mistral Prompt Configuration
```bash
./test_cli.py dev exec mistral-prompt-get
```
**Expected Output**:
```json
{
  "system_prompt": "You are a helpful assistant for uDosConnect.",
  "context_window": 8192,
  "temperature": 0.7,
  "max_tokens": 2048,
  "top_p": 1.0,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.0
}
```

### Test 4: Reset Mistral Prompt Configuration
```bash
./test_cli.py dev exec mistral-prompt-reset
```
**Expected Output**:
```json
{
  "status": "success",
  "config": {
    "system_prompt": "You are a helpful assistant for uDosConnect.",
    "context_window": 4096,
    "temperature": 0.7,
    "max_tokens": 2048,
    "top_p": 1.0,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0
  }
}
```

### Test 5: Check Dev Mode Status
```bash
./test_cli.py dev status
```
**Expected Output**:
```json
{"dev_mode": true, "password_protected": false}
```

### Test 6: Disable Dev Mode
```bash
./test_cli.py dev stop
```
**Expected Output**:
```
✅ Dev Mode deactivated.
```

## Configuration File

The Mistral configuration is stored in `~/.udos/mistral_config.json` and includes the following settings:

```json
{
  "system_prompt": "You are a helpful assistant for uDosConnect.",
  "context_window": 4096,
  "temperature": 0.7,
  "max_tokens": 2048,
  "top_p": 1.0,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.0
}
```

## Next Steps

1. **Integrate with uDosConnect GUI**: Add the Mistral prompt editing functionality to the GUI.
2. **Add More DevOnly Actions**: Implement other DevOnly actions like rate limit tuning, custom format parsers, etc.
3. **Test with Team**: Share with the team for feedback and testing.

## Notes

- The Mistral configuration is persisted to `~/.udos/mistral_config.json`.
- The Dev Mode state is persisted to `~/.udos/dev_mode`.
- The implementation ensures that Mistral prompt editing is only available in Dev Mode.

## Conclusion

The `mistral-prompt-edit` action is now fully functional and ready for integration with the uDosConnect GUI. The implementation provides a clear and intuitive way for developers to adjust Mistral's prompt settings, ensuring a smooth user experience.

**Status**: ✅ Ready for Integration
**Next Steps**: Integrate with uDosConnect GUI and test with the team.

---

**Generated by Mistral Vibe**
**Co-Authored-By: Mistral Vibe <vibe@mistral.ai>**
