# Environment Variables Setup

## Overview

Project ini mendukung **development mode** dan **production mode** dengan file environment yang terpisah.

## File Environment

### `.env.development`

Digunakan saat `NODE_ENV=development`. Berisi konfigurasi untuk development lokal.

### `.env.production`

Digunakan saat `NODE_ENV=production`. Berisi konfigurasi untuk production.

### `.env.example`

Template file untuk dokumentasi. **JANGAN** commit file `.env` yang sebenarnya, tapi commit `.env.example`.

## Environment Variables

### Frontend Variables (REACT*APP*\*)

- `REACT_APP_API_URL` - URL untuk API backend
  - Development: `http://localhost:4000`
  - Production: `https://rickychen930.cloud/api`

### Backend Variables

- `MONGODB_URI` - MongoDB connection string
  - Development: `mongodb://localhost:27017/portfolio-dev`
  - Production: `mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database-name?retryWrites=true&w=majority&authSource=admin`
  - ⚠️ **JANGAN** commit credentials ke repository. Gunakan environment variables atau secrets management.
- `PORT` - Backend server port (default: 4000)
- `NODE_ENV` - Environment mode (`development` atau `production`)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
  - Development: `http://localhost:3000,http://localhost:3001`
  - Production: `https://rickychen930.cloud,https://www.rickychen930.cloud`

## Usage

### Development Mode

**Frontend:**

```bash
npm run start:dev
# atau
NODE_ENV=development npm start
```

**Backend:**

```bash
npm run server:dev
# atau
NODE_ENV=development npm run server
```

**Full Stack (Frontend + Backend):**

```bash
npm run dev
```

### Production Mode

**Frontend:**

```bash
npm run start:prod
# atau
NODE_ENV=production npm start
```

**Backend:**

```bash
npm run server:prod
# atau
NODE_ENV=production npm run server
```

**Build for Production:**

```bash
npm run build
# Frontend akan build dengan NODE_ENV=production
```

## How It Works

### Frontend (React)

React Scripts secara otomatis load file environment berdasarkan `NODE_ENV`:

- `NODE_ENV=development` → Load `.env.development`
- `NODE_ENV=production` → Load `.env.production`

Variables yang dimulai dengan `REACT_APP_` akan di-inject ke dalam bundle.

### Backend (Express)

Backend menggunakan `dotenv` untuk load environment variables:

1. Load `.env.{NODE_ENV}` (e.g., `.env.development` atau `.env.production`)
2. Fallback ke `.env` jika file spesifik tidak ditemukan

## Setup Instructions

1. **Copy template file:**

   ```bash
   cp .env.example .env.development
   cp .env.example .env.production
   ```

2. **Edit `.env.development`** dengan nilai development:

   ```env
   REACT_APP_API_URL=http://localhost:4000
   MONGODB_URI=mongodb://localhost:27017/portfolio-dev
   PORT=4000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

3. **Edit `.env.production`** dengan nilai production:

   ```env
   REACT_APP_API_URL=https://rickychen930.cloud/api
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database-name?retryWrites=true&w=majority&authSource=admin
   PORT=4000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://rickychen930.cloud,https://www.rickychen930.cloud
   ```

   ⚠️ **IMPORTANT**: Ganti `USERNAME` dan `PASSWORD` dengan credentials MongoDB Atlas Anda yang sebenarnya.

4. **Verify `.gitignore`** memastikan file `.env*` tidak di-commit (kecuali `.env.example`)

## Security Notes

⚠️ **IMPORTANT:**

- **JANGAN** commit file `.env`, `.env.development`, atau `.env.production` ke repository
- **JANGAN** share credentials di public repository
- Gunakan `.env.example` untuk dokumentasi tanpa credentials
- Untuk production, gunakan environment variables dari hosting platform (Vercel, Netlify, dll)

## Troubleshooting

### Frontend tidak load environment variables

- Pastikan variable dimulai dengan `REACT_APP_`
- Restart development server setelah mengubah `.env` files
- Pastikan `NODE_ENV` sudah di-set dengan benar

### Backend tidak load environment variables

- Pastikan file `.env.{NODE_ENV}` ada di root directory
- Pastikan `dotenv.config()` dipanggil sebelum menggunakan `process.env`
- Restart server setelah mengubah `.env` files

### CORS errors

- Pastikan `ALLOWED_ORIGINS` mencakup frontend URL
- Pastikan format comma-separated tanpa spaces
- Restart backend setelah mengubah `ALLOWED_ORIGINS`

---

**Last Updated**: Sekarang
**Status**: ✅ **ENVIRONMENT SETUP COMPLETE**
