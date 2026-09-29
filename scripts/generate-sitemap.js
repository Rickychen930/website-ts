/**
 * Generate Sitemap Script
 * Creates sitemap.xml for SEO purposes
 */

const fs = require("fs");
const path = require("path");

// Get base URL from environment or use default.
// Override with REACT_APP_SITE_URL for another domain.
const getBaseUrl = () => {
  if (process.env.REACT_APP_SITE_URL) {
    return process.env.REACT_APP_SITE_URL.replace(/\/$/, "");
  }
  // Committed sitemap must never point at localhost
  return "https://rickychen930.cloud";
};

// Define all routes
const routes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/resume", priority: "0.8", changefreq: "weekly" },
];

// Generate sitemap XML
const generateSitemap = () => {
  const baseUrl = getBaseUrl();
  const currentDate = new Date().toISOString().split("T")[0];

  console.log(`🔍 Generating sitemap for: ${baseUrl}`);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach((route) => {
    const url = `${baseUrl}${route.path}`;
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

// Write sitemap to public directory
const writeSitemap = () => {
  try {
    const publicDir = path.resolve(__dirname, "../public");
    const sitemapPath = path.join(publicDir, "sitemap.xml");

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const sitemap = generateSitemap();
    fs.writeFileSync(sitemapPath, sitemap, "utf8");

    console.log(`✅ Sitemap generated successfully: ${sitemapPath}`);
    console.log(`📄 Routes included: ${routes.length}`);
    routes.forEach((route) => {
      console.log(`   - ${route.path} (priority: ${route.priority})`);
    });
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run the script
writeSitemap();
