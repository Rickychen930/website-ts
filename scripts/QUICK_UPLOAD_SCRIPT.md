# 🚀 Quick Upload Script ke Server

## Cara 1: Upload Script Saja (Cepat)

Ganti `USER`, `HOST`, dan `PATH` dengan informasi server Anda:

```bash
# Upload script nginx-check-and-fix.sh
scp scripts/nginx-check-and-fix.sh USER@HOST:/path/to/website-ts/scripts/

# Contoh jika server di rickychen930.cloud:
scp scripts/nginx-check-and-fix.sh root@rickychen930.cloud:/root/website-ts/scripts/

# Atau jika di /home/ubuntu:
scp scripts/nginx-check-and-fix.sh ubuntu@rickychen930.cloud:/home/ubuntu/website-ts/scripts/
```

Setelah upload, set permission:
```bash
ssh USER@HOST "chmod +x /path/to/website-ts/scripts/nginx-check-and-fix.sh"
```

## Cara 2: Upload Semua Script (Recommended)

Edit file `scripts/upload-to-server.sh` dulu:
```bash
nano scripts/upload-to-server.sh
```

Update baris 10-12:
```bash
SERVER_USER="root"  # atau "ubuntu"
SERVER_HOST="rickychen930.cloud"  # atau IP address
SERVER_PATH="/root/website-ts"  # atau /home/ubuntu/website-ts
```

Kemudian jalankan:
```bash
bash scripts/upload-to-server.sh
```

## Cara 3: Manual Upload via SSH

1. **Login ke server:**
   ```bash
   ssh root@rickychen930.cloud
   # atau
   ssh ubuntu@rickychen930.cloud
   ```

2. **Clone/pull project terbaru (jika menggunakan git):**
   ```bash
   cd /root/website-ts  # atau /home/ubuntu/website-ts
   git pull origin main
   ```

3. **Atau upload manual:**
   ```bash
   # Dari local machine
   scp scripts/nginx-check-and-fix.sh root@rickychen930.cloud:/root/website-ts/scripts/
   ```

## Setelah Upload

Jalankan di server:
```bash
# Login ke server
ssh root@rickychen930.cloud

# Masuk ke folder project
cd /root/website-ts  # atau path sesuai server Anda

# Jalankan script check & fix
sudo bash scripts/nginx-check-and-fix.sh
```

## Troubleshooting

### Error: "Could not resolve hostname"
- Pastikan hostname atau IP address benar
- Cek koneksi internet
- Coba dengan IP address langsung: `scp ... root@123.456.789.0:/path/...`

### Error: "Permission denied"
- Pastikan user memiliki akses ke server
- Cek SSH key sudah ter-setup
- Coba dengan password: `scp -o PreferredAuthentications=password ...`

### Error: "No such file or directory"
- Pastikan folder `scripts/` sudah ada di server
- Buat folder dulu: `ssh USER@HOST "mkdir -p /path/to/website-ts/scripts"`

