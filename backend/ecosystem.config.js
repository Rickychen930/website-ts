/**
 * PM2 Ecosystem Configuration
 * For managing backend server in production
 *
 * IMPORTANT: This config uses compiled JavaScript (dist/main.js)
 * Make sure to build the backend first: npm run backend:build
 *
 * For development, use nodemon or tsx directly instead of PM2
 */

module.exports = {
  apps: [
    {
      name: "website-backend",
      // Use compiled JavaScript (requires: npm run backend:build)
      // This avoids ERR_REQUIRE_ESM error with tsx
      script: "./dist/main.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 4001,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};
