/**
 * PM2 Ecosystem Configuration
 * For managing backend server in production
 */

module.exports = {
  apps: [
    {
      name: "website-backend",
      // Use tsx to avoid ESM module issues with jsdom/html-encoding-sniffer
      // Alternative: script: "./dist/main.js" (if ESM issue is fixed)
      script: "tsx",
      args: "src/main.ts",
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
