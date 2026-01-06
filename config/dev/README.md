# Development Tool Configurations

Folder ini berisi konfigurasi untuk development tools seperti linters dan formatters.

## 📋 Files

### .eslintrc.json
Konfigurasi ESLint untuk JavaScript/TypeScript linting. File ini di-symlink ke root sebagai `.eslintrc.json` karena ESLint mengharapkan file config di root directory.

**Configuration:**
- Extends: `react-app`, `react-app/jest`
- Used by: ESLint, IDE extensions, build tools

### .stylelintrc.json
Konfigurasi Stylelint untuk CSS linting. File ini di-symlink ke root sebagai `.stylelintrc.json` karena Stylelint mengharapkan file config di root directory.

**Configuration:**
- Extends: `stylelint-config-standard`
- Plugins: `stylelint-order`
- Custom property order rules

## 🔗 Symlinks

File-file ini di-symlink ke root directory karena:
1. ESLint dan Stylelint secara default mencari config di root
2. IDE dan editor extensions mengharapkan config di root
3. Build tools (seperti react-scripts) mengharapkan config di root

**Symlink locations:**
- `config/dev/.eslintrc.json` → `.eslintrc.json` (root)
- `config/dev/.stylelintrc.json` → `.stylelintrc.json` (root)

## 📝 Notes

Jika symlink hilang atau rusak, buat ulang dengan:
```bash
ln -sf config/dev/.eslintrc.json .eslintrc.json
ln -sf config/dev/.stylelintrc.json .stylelintrc.json
```

