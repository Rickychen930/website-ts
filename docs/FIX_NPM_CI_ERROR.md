# 🔧 Fix: npm ci Error - package-lock.json Missing

## ❌ Error yang Terjadi

```
npm error The `npm ci` command can only install with an existing package-lock.json
```

## ✅ Solusi

### Opsi 1: Upload package-lock.json (Recommended)

**Di Local:**
```bash
# Upload package-lock.json ke server
scp package-lock.json root@rickychen930.cloud:/root/website-ts/
```

**Di Server (SSH):**
```bash
cd /root/website-ts
npm ci --omit=dev --legacy-peer-deps
```

### Opsi 2: Gunakan npm install (Jika package-lock.json tidak ada)

**Di Server (SSH):**
```bash
cd /root/website-ts
npm install --omit=dev --legacy-peer-deps
```

## 📝 Perbedaan npm ci vs npm install

- **`npm ci`**: 
  - Lebih cepat dan deterministik
  - Membutuhkan `package-lock.json`
  - Menghapus `node_modules` sebelum install
  - Cocok untuk production

- **`npm install`**:
  - Tidak membutuhkan `package-lock.json`
  - Bisa mengupdate `package-lock.json`
  - Lebih fleksibel

## 🚀 Quick Fix untuk Server Anda

**Jalankan di server (SSH):**

```bash
cd /root/website-ts

# Jika package-lock.json sudah di-upload:
npm ci --omit=dev --legacy-peer-deps

# Jika package-lock.json belum ada:
npm install --omit=dev --legacy-peer-deps
```

## 📤 Upload package-lock.json dari Local

**Di local machine:**

```bash
# Upload package-lock.json
scp package-lock.json root@rickychen930.cloud:/root/website-ts/

# Atau gunakan script upload yang sudah di-update
bash upload-to-server.sh
```

Script `upload-to-server.sh` sudah di-update untuk otomatis upload `package-lock.json` jika file tersebut ada.

## ✅ Verifikasi

Setelah install, verifikasi:

```bash
# Check node_modules
ls -la node_modules/

# Check jika dependencies terinstall
npm list --depth=0
```

