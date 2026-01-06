# Configuration Files

Folder ini berisi file-file konfigurasi untuk deployment, infrastruktur, dan development tools.

## 📋 Files

### env.example
Template file untuk environment variables. Copy file ini ke `.env` di root project dan sesuaikan nilainya.

**Usage:**
```bash
cp config/env.example .env
# Edit .env dengan konfigurasi Anda
```

### nginx.conf
Konfigurasi Nginx untuk production server. File ini digunakan untuk:
- Reverse proxy ke backend API
- SSL/TLS configuration
- Static file serving dengan caching
- Security headers
- Gzip compression

**Usage:**
```bash
# Copy ke server
sudo cp config/nginx.conf /etc/nginx/sites-available/rickychen930.cloud

# Create symlink
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

Atau gunakan script otomatis:
```bash
sudo bash scripts/nginx-setup.sh
```

### dev/
Folder ini berisi konfigurasi untuk development tools:
- `.eslintrc.json` - ESLint configuration (symlinked ke root sebagai `.eslintrc.json`)
- `.stylelintrc.json` - Stylelint configuration (symlinked ke root sebagai `.stylelintrc.json`)

**Note:** File-file linter config disimpan di `config/dev/` untuk organisasi yang lebih baik, tetapi di-symlink ke root karena tool-tool mengharapkan mereka di root directory.

## 🔧 Setup

### Environment Variables
1. Copy template:
   ```bash
   cp config/env.example .env
   ```
2. Edit `.env` dengan konfigurasi yang sesuai

### Nginx Setup
1. Pastikan SSL certificates sudah terinstall:
   ```bash
   sudo certbot certonly --nginx -d rickychen930.cloud -d www.rickychen930.cloud
   ```

2. Update domain name di `nginx.conf` jika berbeda

3. Test dan reload nginx

