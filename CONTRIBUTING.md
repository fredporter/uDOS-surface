# Contributing to uDosConnect

Thank you for contributing to uDosConnect! This guide will help you get started with the development workflow.

## Development Workflow

### 1. Prerequisites

- Node.js (>= 18)
- npm (>= 9)
- Git
- Bash (or Zsh on macOS)

### 2. Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/fredporter/uDosConnect.git
   cd uDosConnect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install ESLint and related plugins:
   ```bash
   npm install --save-dev eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @eslint/js
   ```

### 3. Development Scripts

- **Build the project**:
  ```bash
  npm run build
  ```

- **Run tests**:
  ```bash
  npm run test
  ```

- **Lint the code**:
  ```bash
  npm run lint:check
  ```

- **Fix linting issues**:
  ```bash
  npm run lint
  ```

### 4. Pre-Commit Hooks

The project uses a pre-commit hook to ensure code quality before committing. The hook performs the following checks:

1. **VibeCLI Configuration Validation**: Validates the VibeCLI configuration.
2. **Trailing Comma Check**: Checks for trailing commas in Vue files.
3. **Linting**: Runs ESLint on TypeScript and JavaScript files to catch syntax errors and enforce code style.
4. **Workspace Validation**: Validates the npm workspaces configuration.

If any of these checks fail, the commit will be aborted. Fix the issues and try committing again.

#### ESLint Configuration

The project uses ESLint to enforce code style and catch syntax errors. The configuration is defined in `eslint.config.js` and includes the following rules:

- `eslint:recommended`: Recommended ESLint rules.
- `plugin:@typescript-eslint/recommended`: Recommended TypeScript ESLint rules.
- Custom rules for `no-console`, `no-debugger`, `no-unused-vars`, and `no-useless-assignment`.

To lint the code manually, run:
```bash
npm run lint:check
```

To fix linting issues automatically, run:
```bash
npm run lint
```

### 5. Scripts

The project includes several scripts to help with development:

- **`scripts/fix_comma.sh`**: Removes trailing commas from Vue files.
- **`scripts/test_modular.sh`**: Tests the modular scripting functionality.
- **`scripts/lib/file_utils.sh`**: Library of reusable functions for file operations.

### 6. CI/CD Workflow

The project uses GitHub Actions for continuous integration. The workflow runs the following checks on every push and pull request:

1. **Pre-Commit Checks**: Runs the pre-commit hook to validate the code.
2. **Linting**: Runs ESLint on Vue files.

### 7. Code Style

- Use `eslint` for linting Vue, JavaScript, and TypeScript files.
- Follow the Vue 3 style guide for Vue components.
- Use TypeScript for type safety.

### 8. Commit Messages

Use clear and descriptive commit messages. Follow the conventional commits format:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (e.g., formatting, missing semicolons)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (e.g., updating dependencies)

Example:
```bash
git commit -m "feat: Add new feature for user authentication"
```

### 9. Pull Requests

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

### 10. Issues

Report bugs and request features by opening an issue on GitHub. Include as much detail as possible.

## License

By contributing to uDosConnect, you agree that your contributions will be licensed under the MIT License.
