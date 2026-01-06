# CSS Architecture Scripts

## Available Scripts

### 1. Generate CSS Variables

Generate CSS variables from TypeScript constants.

```bash
npm run css:generate
```

**Output**: `src/assets/css/core/_variables-generated.css`

**Usage**: Run this script whenever you update TypeScript constants to keep CSS in sync.

### 2. Check CSS Architecture

Validate CSS files against architecture guidelines.

```bash
# Check all CSS files
npm run css:check

# Check specific file
npm run css:check:file src/assets/css/my-file.css
```

**Checks for**:

- Hardcoded colors (should use CSS variables)
- Hardcoded spacing (should use CSS variables)
- Non-BEM naming (should follow BEM convention)

**Example Output**:

```
🔍 Checking CSS architecture...

⚠️  Found 3 issue(s):

🎨 Hardcoded Colors:
  src/assets/css/my-file.css:15
    color: #667eea
    → Use CSS variable: var(--color-accent-primary)

📏 Hardcoded Spacing:
  src/assets/css/my-file.css:20
    padding: 2.5rem
    → Use CSS variable: var(--spacing-card-padding)
```

## Integration with CI/CD

Add to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Check CSS Architecture
  run: npm run css:check
```

## Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run css:check
if [ $? -ne 0 ]; then
  echo "CSS architecture check failed. Please fix issues before committing."
  exit 1
fi
```

## Usage in Development

### Daily Development

1. **Before committing**: Run `npm run css:check` to validate your CSS
2. **After updating constants**: Run `npm run css:generate` to regenerate CSS variables
3. **When creating new CSS**: Use the checker to ensure compliance

### Migration Workflow

1. Refactor CSS file to use CSS variables
2. Run `npm run css:check:file path/to/file.css` to validate
3. Fix any issues reported
4. Commit changes

## Script Details

### generate-css-variables.js

- **Purpose**: Generate CSS variables from TypeScript constants
- **Input**: TypeScript constants files
- **Output**: `_variables-generated.css`
- **When to run**: After updating constants

### check-css-architecture.js

- **Purpose**: Validate CSS against architecture guidelines
- **Input**: CSS files (all or specific)
- **Output**: Report of issues found
- **When to run**: Before committing, in CI/CD

## Troubleshooting

### Script not found

Make sure scripts are executable:

```bash
chmod +x scripts/*.js
```

### glob not found

Install glob if needed:

```bash
npm install --save-dev glob
```

### Script fails

Check Node.js version (requires Node 12+):

```bash
node --version
```

## Contributing

When adding new scripts:

1. Add script to `scripts/` directory
2. Add npm script to `package.json`
3. Document in this README
4. Test thoroughly

---

**Happy coding!** 🎉
