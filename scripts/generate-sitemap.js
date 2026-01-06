/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml dynamically based on current configuration
 */

const fs = require("fs");
const path = require("path");

const SITEMAP_PATH = path.join(__dirname, "../public/sitemap.xml");
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://rickychen930.cloud";

/**
 * Sections configuration
 */
const SECTIONS = [
  { id: "about", priority: 1.0, changefreq: "monthly" },
  { id: "skills", priority: 0.9, changefreq: "monthly" },
  { id: "experience", priority: 0.8, changefreq: "monthly" },
  { id: "projects", priority: 0.8, changefreq: "monthly" },
  { id: "academic", priority: 0.7, changefreq: "monthly" },
  { id: "certifications", priority: 0.7, changefreq: "monthly" },
  { id: "honors", priority: 0.6, changefreq: "monthly" },
  { id: "testimonials", priority: 0.7, changefreq: "monthly" },
  { id: "contact", priority: 0.8, changefreq: "monthly" },
];

/**
 * Get current date in ISO format
 */
function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const urls = [
    {
      loc: BASE_URL,
      lastmod: getCurrentDate(),
      changefreq: "weekly",
      priority: 1.0,
    },
    ...SECTIONS.map((section) => ({
      loc: `${BASE_URL}/#${section.id}`,
      lastmod: getCurrentDate(),
      changefreq: section.changefreq,
      priority: section.priority,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return sitemap;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Write sitemap to file
 */
function writeSitemap() {
  try {
    const sitemap = generateSitemap();
    fs.writeFileSync(SITEMAP_PATH, sitemap, "utf8");
    console.log("✅ Sitemap generated successfully!");
    console.log(`📄 Location: ${SITEMAP_PATH}`);
    console.log(`🌐 Base URL: ${BASE_URL}`);
    console.log(`📊 URLs: ${SECTIONS.length + 1}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

// Run generator
writeSitemap();
