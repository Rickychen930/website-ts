# PM2 & Nginx Setup Guide

Panduan cepat untuk setup dan troubleshooting PM2 dan Nginx.

## 📋 PM2 Configuration

### File: `backend/ecosystem.config.js`

**Perbaikan yang dilakukan:**
- ✅ Path script menggunakan absolute path dengan `path.join(__dirname, ...)`
- ✅ Log files menggunakan absolute path
- ✅ Added `kill_timeout`, `wait_ready`, `listen_timeout` untuk stabilitas
- ✅ Added PORT environment variable

### Quick Commands

```bash
# Setup PM2 environment
bash pm2-setup.sh setup

# Start application
bash pm2-setup.sh start

# Restart application
bash pm2-setup.sh restart

# Check status
bash pm2-setup.sh status

# View logs
bash pm2-setup.sh logs

# Stop application
bash pm2-setup.sh stop

# Setup auto-start on boot
bash pm2-setup.sh startup
```

### Manual PM2 Commands

```bash
# Start
pm2 start backend/ecosystem.config.js --env production

# Stop
pm2 stop website-backend

# Restart
pm2 restart website-backend

# Delete
pm2 delete website-backend

# View logs
pm2 logs website-backend

# Monitor
pm2 monit

# Save current process list
pm2 save
```

## 🌐 Nginx Configuration

### File: `nginx.conf`

**Fitur:**
- ✅ HTTP to HTTPS redirect
- ✅ SSL/TLS configuration dengan security headers
- ✅ Reverse proxy ke backend (port 4000)
- ✅ Static file caching
- ✅ Gzip compression
- ✅ Proper proxy headers

### Setup Nginx

```bash
# 1. Copy config ke nginx (menggunakan script)
sudo bash nginx-setup.sh

# 2. Atau manual:
sudo cp nginx.conf /etc/nginx/sites-available/rickychen930.cloud
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# 3. Test configuration
sudo nginx -t

# 4. Reload nginx
sudo systemctl reload nginx
```

### SSL Certificate Setup

```bash
# Install Let's Encrypt certificate
sudo certbot certonly --nginx -d rickychen930.cloud -d www.rickychen930.cloud

# Auto-renewal (usually already setup)
sudo certbot renew --dry-run
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload (graceful)
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# Status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log
sudo tail -f /var/log/nginx/rickychen930.cloud.access.log
```

## 🔍 Troubleshooting

### PM2 Issues

**Application tidak start:**
```bash
# Check logs
pm2 logs website-backend --lines 50

# Check if backend is built
ls -la backend/dist/main.js

# Rebuild if needed
npm run backend:build

# Check ecosystem config
cat backend/ecosystem.config.js
```

**Application crash loop:**
```bash
# Check error logs
tail -f backend/logs/pm2-error.log

# Check memory usage
pm2 monit

# Restart dengan fresh start
pm2 delete website-backend
bash pm2-setup.sh start
```

**Port already in use:**
```bash
# Check what's using port 4000
sudo lsof -i :4000
# atau
sudo netstat -tulpn | grep 4000

# Kill process if needed
sudo kill -9 <PID>
```

### Nginx Issues

**502 Bad Gateway:**
```bash
# Check if backend is running
pm2 status

# Check backend logs
pm2 logs website-backend

# Test backend directly
curl http://localhost:4000/health

# Check nginx error log
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log
```

**SSL Certificate errors:**
```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Check certificate files
sudo ls -la /etc/letsencrypt/live/rickychen930.cloud/
```

**Nginx configuration test fails:**
```bash
# Test configuration
sudo nginx -t

# Check for syntax errors in config
sudo nginx -T | grep -A 5 -B 5 error
```

## 📝 Checklist Deployment

- [ ] Backend built: `npm run backend:build`
- [ ] Frontend built: `npm run build`
- [ ] Environment variables set: `.env` file configured
- [ ] PM2 started: `bash pm2-setup.sh start`
- [ ] PM2 auto-start setup: `bash pm2-setup.sh startup`
- [ ] Nginx configured: `sudo bash nginx-setup.sh`
- [ ] SSL certificate installed: `sudo certbot certonly --nginx`
- [ ] Firewall configured (ports 80, 443)
- [ ] MongoDB connection working
- [ ] Health check passing: `curl https://rickychen930.cloud/health`

## 🔐 Security Notes

1. **Firewall**: Pastikan hanya port 80, 443, dan 22 (SSH) yang terbuka
2. **SSL**: Selalu gunakan HTTPS di production
3. **Environment Variables**: Jangan commit `.env` file
4. **PM2 Logs**: Rotate logs secara berkala untuk menghindari disk penuh
5. **Nginx**: Update security headers sesuai kebutuhan

## 📚 Additional Resources

- PM2 Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/
- Nginx Documentation: https://nginx.org/en/docs/
- Let's Encrypt: https://letsencrypt.org/docs/

