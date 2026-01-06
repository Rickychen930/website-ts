# Website TypeScript - Fullstack Portfolio

Aplikasi portfolio fullstack yang dibangun dengan React (TypeScript) untuk frontend dan Express (TypeScript) untuk backend.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Setup environment
cp config/env.example .env
# Edit .env dengan konfigurasi Anda

# Run development server (frontend + backend)
npm run dev

# Atau secara terpisah:
npm start              # Frontend (http://localhost:3000)
npm run server:watch   # Backend (http://localhost:4000)
```

### Production Build

```bash
# Build semua (frontend + backend)
npm run build:all

# Atau secara terpisah:
npm run build          # Frontend
npm run backend:build  # Backend
```

## 📁 Project Structure

```
website-ts/
├── backend/              # Backend Express API
│   ├── src/             # TypeScript source files
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic services
│   │   ├── types/       # TypeScript type definitions
│   │   └── seed/        # Database seeding scripts
│   ├── dist/            # Compiled JavaScript (gitignored)
│   ├── logs/            # Application logs (gitignored)
│   ├── ecosystem.config.js  # PM2 configuration
│   └── tsconfig.backend.json # TypeScript config for backend
├── src/                 # React frontend source
│   ├── assets/          # Static assets (images, CSS)
│   ├── config/          # Frontend configuration
│   ├── controllers/     # Frontend controllers (MVC pattern)
│   ├── models/          # Frontend data models
│   ├── routes/          # React Router configuration
│   ├── services/        # API service layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── views/           # React components and pages
│       ├── components/  # Reusable UI components
│       └── pages/       # Page components
├── public/              # Public static assets
├── docs/                # Documentation files
├── scripts/             # Deployment and setup scripts
├── docker/              # Docker configuration files
│   ├── Dockerfile       # Docker image configuration
│   └── docker-compose.yml # Docker Compose setup
├── config/              # Configuration files
│   └── nginx.conf       # Nginx server configuration
└── config/              # Configuration files
    ├── env.example       # Environment variables template
    └── nginx.conf        # Nginx server configuration
```

## 🛠 Tech Stack

### Frontend
- React 19
- TypeScript
- React Router
- CSS Modules

### Backend
- Express 5
- TypeScript
- MongoDB (Mongoose)
- PM2 (Process Manager)

### DevOps
- Docker & Docker Compose
- GitHub Actions
- PM2
- Nginx (optional)

## 📚 Documentation

Semua dokumentasi tersedia di folder [`docs/`](./docs/):

- [Project Structure](./docs/PROJECT_STRUCTURE.md) - Struktur proyek dan arsitektur lengkap
- [Deployment Guide](./docs/DEPLOYMENT.md) - Panduan lengkap deployment
- [Deployment Workflow](./docs/DEPLOYMENT_WORKFLOW.md) - Workflow deployment
- [PM2 & Nginx Setup](./docs/PM2_NGINX_SETUP.md) - Konfigurasi PM2 dan Nginx
- [Troubleshooting Cache](./docs/TROUBLESHOOTING_CACHE.md) - Solusi jika tampilan masih lama setelah deploy
- [Changelog](./docs/CHANGELOG.md) - Riwayat perubahan
- [Environment Variables](./config/env.example) - Contoh konfigurasi environment

Lihat [docs/README.md](./docs/README.md) untuk daftar lengkap dokumentasi.

## 🔧 Available Scripts

### Development
- `npm start` - Start React development server
- `npm run dev` - Start frontend + backend concurrently
- `npm run server` - Start backend only
- `npm run server:watch` - Start backend with hot reload

### Build
- `npm run build` - Build React app for production
- `npm run backend:build` - Build backend TypeScript
- `npm run build:all` - Build both frontend and backend

### Deployment
- `npm run backend:pm2` - Start backend with PM2 (production)
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Start with Docker Compose
- `npm run docker:stop` - Stop Docker containers

### Database
- `npm run seed` - Seed database with sample data

## 🌐 Environment Variables

Lihat file `config/env.example` untuk daftar lengkap environment variables yang diperlukan.

## 🐳 Docker

### Build dan Run

```bash
# Build image
npm run docker:build

# Run dengan docker-compose
npm run docker:run

# View logs
npm run docker:logs
```

## 📦 Deployment

Deployment otomatis dilakukan melalui GitHub Actions saat push ke branch `main`.

Untuk deployment manual, lihat [Deployment Guide](./docs/DEPLOYMENT.md).

## 🔒 Security

- CORS configuration via environment variables
- SSL/TLS support untuk production
- Environment variables untuk sensitive data
- Input validation dan sanitization

## 📝 License

Private project

## 👤 Author

Ricky Chen

---

Untuk informasi lebih lanjut tentang deployment, lihat [Deployment Guide](./docs/DEPLOYMENT.md).
