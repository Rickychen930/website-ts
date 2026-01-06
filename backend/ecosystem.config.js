const path = require('path');

module.exports = {
  apps: [
    {
      name: 'website-backend',
      script: path.join(__dirname, 'dist', 'main.js'),
      cwd: path.join(__dirname),
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      error_file: path.join(__dirname, 'logs', 'pm2-error.log'),
      out_file: path.join(__dirname, 'logs', 'pm2-out.log'),
      log_file: path.join(__dirname, 'logs', 'pm2-combined.log'),
      time: true,
      merge_logs: true,
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
};

