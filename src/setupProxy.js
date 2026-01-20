/**
 * Setup Proxy for Development
 * Proxies API requests from frontend (port 3000) to backend (port 4000)
 * This file is automatically loaded by Create React App
 */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy API requests to backend server
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
      onProxyReq: (proxyReq, req, res) => {
        console.log(
          `[Proxy] ${req.method} ${req.url} -> http://localhost:4000${req.url}`,
        );
      },
      onError: (err, req, res) => {
        console.error(`[Proxy Error] ${req.url}:`, err.message);
        res.status(500).json({
          error: "Proxy error",
          message:
            "Backend server is not running. Please start it with: npm run server:watch",
        });
      },
    }),
  );

  // Proxy health check endpoint
  app.use(
    "/health",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
      secure: false,
    }),
  );
};
