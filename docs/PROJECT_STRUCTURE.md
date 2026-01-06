# Project Structure

Dokumen ini menjelaskan struktur proyek secara detail.

## 📁 Struktur Direktori

```
website-ts/
├── backend/                    # Backend Express API
│   ├── src/                   # Source code TypeScript
│   │   ├── config/           # Konfigurasi (database, dll)
│   │   ├── controllers/      # Route controllers
│   │   ├── data/             # Data seed/static
│   │   ├── models/           # Data models (Mongoose)
│   │   ├── routes/           # API route definitions
│   │   ├── seed/             # Database seeding scripts
│   │   ├── types/            # TypeScript type definitions
│   │   └── main.ts           # Entry point backend
│   ├── dist/                 # Compiled JavaScript (gitignored)
│   ├── logs/                 # Application logs (gitignored)
│   ├── ecosystem.config.js   # PM2 configuration
│   └── tsconfig.backend.json # TypeScript config untuk backend
│
├── src/                       # Frontend React Application
│   ├── assets/               # Static assets
│   │   └── css/              # Stylesheet files
│   ├── config/               # Frontend configuration
│   ├── controllers/          # Frontend controllers (MVC pattern)
│   ├── models/               # Frontend data models
│   ├── routes/               # React Router configuration
│   ├── services/             # API service layer
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── views/                # React components
│   │   ├── components/      # Reusable UI components
│   │   │   ├── about-me/    # About Me section components
│   │   │   ├── academic/    # Academic section components
│   │   │   ├── certification/ # Certification components
│   │   │   ├── contact/     # Contact section components
│   │   │   ├── footer/      # Footer components
│   │   │   ├── honors/      # Honors section components
│   │   │   ├── languages/   # Languages section components
│   │   │   ├── navbar/      # Navbar components
│   │   │   ├── projects/    # Projects section components
│   │   │   ├── soft-skills/ # Soft skills components
│   │   │   ├── technical-skills/ # Technical skills components
│   │   │   └── work-experience/ # Work experience components
│   │   └── pages/           # Page components
│   │       └── sections/    # Section page components
│   ├── App.tsx              # Root React component
│   └── index.tsx            # Application entry point
│
├── public/                   # Public static assets
│   └── assets/              # Public assets (images, documents)
│
├── docs/                     # Dokumentasi proyek
│   ├── README.md            # Index dokumentasi
│   ├── DEPLOYMENT.md        # Panduan deployment
│   ├── CHANGELOG.md         # Riwayat perubahan
│   └── ...                  # Dokumentasi lainnya
│
├── scripts/                  # Deployment & setup scripts
│   ├── upload-to-server.sh  # Script upload ke server
│   ├── pm2-setup.sh         # Script setup PM2
│   ├── nginx-setup.sh       # Script setup Nginx
│   └── quick-fix-server.sh  # Script perbaikan cepat
│
├── docker/                   # Docker configuration files
│   ├── Dockerfile           # Docker image configuration
│   └── docker-compose.yml   # Docker Compose setup
│
├── config/                   # Configuration files
│   └── nginx.conf           # Nginx server configuration
│
├── .gitignore               # Git ignore rules
├── config/                   # Configuration files
│   ├── env.example         # Template environment variables
│   ├── nginx.conf         # Nginx server configuration
│   ├── README.md          # Configuration documentation
│   └── dev/                # Development tool configurations
│       ├── .eslintrc.json  # ESLint configuration (symlinked to root)
│       ├── .stylelintrc.json # Stylelint configuration (symlinked to root)
│       └── README.md      # Dev tools documentation
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # TypeScript config untuk frontend
└── README.md                # Dokumentasi utama
```

## 🏗️ Arsitektur

### Backend (Express + TypeScript)
- **MVC Pattern**: Separation of concerns dengan controllers, models, dan routes
- **TypeScript**: Type safety untuk semua kode
- **MongoDB**: Database dengan Mongoose ODM
- **PM2**: Process management untuk production

### Frontend (React + TypeScript)
- **Component-Based Architecture**: Reusable components
- **MVC Pattern**: Controllers untuk business logic, Models untuk data structure
- **TypeScript**: Type safety
- **React Router**: Client-side routing
- **Code Splitting**: Lazy loading untuk optimasi performa

## 📦 Build Outputs

File-file berikut dihasilkan saat build dan **tidak** di-commit ke repository:
- `build/` - Frontend production build
- `backend/dist/` - Backend compiled JavaScript
- `backend/logs/` - Application logs

## 🔧 Configuration Files

- `package.json` - Dependencies dan scripts
- `tsconfig.json` - TypeScript config untuk frontend
- `backend/tsconfig.backend.json` - TypeScript config untuk backend
- `.env` - Environment variables (tidak di-commit)
- `config/env.example` - Template environment variables
- `config/dev/.eslintrc.json` - ESLint configuration (symlinked to root)
- `config/dev/.stylelintrc.json` - Stylelint configuration (symlinked to root)
- `docker/docker-compose.yml` - Docker Compose configuration
- `docker/Dockerfile` - Docker image configuration
- `config/nginx.conf` - Nginx server configuration
- `backend/ecosystem.config.js` - PM2 process configuration

## 📝 Best Practices

1. **Separation of Concerns**: Setiap layer memiliki tanggung jawab yang jelas
2. **Type Safety**: Semua kode menggunakan TypeScript
3. **Code Organization**: File diorganisir berdasarkan fitur/domain
4. **Documentation**: Dokumentasi lengkap di folder `docs/`
5. **Scripts**: Semua deployment scripts di folder `scripts/`
6. **Git Ignore**: Build artifacts dan sensitive files diabaikan

## 🚀 Development Workflow

1. **Frontend Development**: `npm start` (port 3000)
2. **Backend Development**: `npm run server:watch` (port 4000)
3. **Full Stack Development**: `npm run dev` (keduanya)
4. **Production Build**: `npm run build:all`
5. **Database Seeding**: `npm run seed`

