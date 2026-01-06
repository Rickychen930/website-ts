# Multi-stage build for backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/tsconfig.backend.json ./backend/
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production --legacy-peer-deps

# Copy backend source
COPY backend/src ./backend/src

# Build backend
RUN npm run backend:build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --legacy-peer-deps

# Copy built backend from builder
COPY --from=builder /app/backend/dist ./backend/dist

# Copy PM2 config
COPY backend/ecosystem.config.js ./backend/

# Copy React build (if exists, for serving static files)
COPY build ./build

# Create logs directory
RUN mkdir -p /app/backend/logs

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start with PM2
CMD ["pm2-runtime", "start", "backend/ecosystem.config.js", "--env", "production"]

