# Docker Configuration

Folder ini berisi file-file konfigurasi Docker untuk containerization aplikasi.

## 📋 Files

### Dockerfile
Multi-stage Docker build untuk backend application. Menggunakan:
- Node.js 20 Alpine (lightweight)
- PM2 untuk process management
- Production-optimized build

### docker-compose.yml
Docker Compose configuration untuk orchestration. Mengatur:
- Backend service
- Network configuration
- Volume mounts
- Environment variables
- Health checks

## 🚀 Usage

### Build Docker Image
```bash
npm run docker:build
# atau
docker build -f docker/Dockerfile -t website-backend .
```

### Run with Docker Compose
```bash
npm run docker:run
# atau
docker-compose -f docker/docker-compose.yml up -d
```

### Stop Containers
```bash
npm run docker:stop
# atau
docker-compose -f docker/docker-compose.yml down
```

### View Logs
```bash
npm run docker:logs
# atau
docker-compose -f docker/docker-compose.yml logs -f
```

## ⚙️ Configuration

### Environment Variables
Pastikan file `.env` ada di root project dengan variabel:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Backend port (default: 4000)
- `NODE_ENV` - Environment (production/development)
- `ALLOWED_ORIGINS` - CORS allowed origins

### Volumes
- `./backend/logs` → `/app/backend/logs` - Application logs
- `./build` → `/app/build` - Frontend build files

### Ports
- `4000:4000` - Backend API port

## 📝 Notes

- Dockerfile menggunakan multi-stage build untuk optimasi ukuran image
- PM2 digunakan untuk process management di production
- Health check endpoint: `http://localhost:4000/health`

