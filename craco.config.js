/**
 * CRACO Configuration - Customize Create React App
 * Enables TypeScript path aliases (@/) in webpack
 */

const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      const srcPath = path.resolve(__dirname, "src");

      // Ensure resolve exists
      if (!webpackConfig.resolve) {
        webpackConfig.resolve = {};
      }

      // Set up alias - this is the primary method
      if (!webpackConfig.resolve.alias) {
        webpackConfig.resolve.alias = {};
      }

      // Set alias explicitly
      webpackConfig.resolve.alias["@"] = srcPath;

      // Ensure resolve.plugins exists
      if (!webpackConfig.resolve.plugins) {
        webpackConfig.resolve.plugins = [];
      }

      // Remove any existing TsconfigPathsPlugin to avoid duplicates
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => {
          if (plugin instanceof TsconfigPathsPlugin) {
            return false;
          }
          if (
            plugin &&
            plugin.constructor &&
            plugin.constructor.name === "TsconfigPathsPlugin"
          ) {
            return false;
          }
          return true;
        },
      );

      // Add tsconfig-paths-webpack-plugin as fallback
      webpackConfig.resolve.plugins.push(
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, "tsconfig.json"),
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
          logLevel: "WARN",
        }),
      );

      // Ensure extensions are included
      if (!webpackConfig.resolve.extensions) {
        webpackConfig.resolve.extensions = [];
      }

      // Add extensions if not present
      const requiredExtensions = [".tsx", ".ts", ".jsx", ".js", ".json"];
      requiredExtensions.forEach((ext) => {
        if (!webpackConfig.resolve.extensions.includes(ext)) {
          webpackConfig.resolve.extensions.unshift(ext);
        }
      });

      return webpackConfig;
    },
  },
};
