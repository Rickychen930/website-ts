/**
 * Test Backend API Connection
 * Tests if backend API is accessible and returns profile data
 */

const http = require("http");

const testBackendAPI = async () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const endpoints = [
    { path: "/health", name: "Health Check" },
    { path: "/api/profile", name: "Profile API" },
  ];

  console.log("🔍 Testing Backend API Connection...");
  console.log(`📡 API URL: ${apiUrl}\n`);

  for (const endpoint of endpoints) {
    const url = `${apiUrl}${endpoint.path}`;
    console.log(`Testing ${endpoint.name} (${url})...`);

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      const isJSON = contentType && contentType.includes("application/json");

      if (isJSON) {
        const data = await response.json();
        console.log(`✅ ${endpoint.name}: OK`);
        if (endpoint.path === "/api/profile") {
          console.log(`   👤 Name: ${data.name || "N/A"}`);
          console.log(`   💼 Title: ${data.title || "N/A"}`);
          console.log(
            `   🔧 Technical Skills: ${data.technicalSkills?.length || 0} skills`,
          );
          console.log(
            `   💡 Soft Skills: ${data.softSkills?.length || 0} skills`,
          );
        } else {
          console.log(`   Response:`, JSON.stringify(data, null, 2));
        }
      } else {
        const text = await response.text();
        if (text.includes("<!DOCTYPE") || text.includes("<html")) {
          console.log(
            `❌ ${endpoint.name}: Server returned HTML instead of JSON`,
          );
          console.log(
            `   💡 This means the frontend dev server is running, but backend API is not accessible`,
          );
        } else {
          console.log(
            `⚠️  ${endpoint.name}: Unexpected content type: ${contentType}`,
          );
          console.log(`   Response preview: ${text.substring(0, 100)}...`);
        }
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Failed`);
      console.log(`   Error: ${error.message}`);
      if (
        error.message.includes("fetch failed") ||
        error.message.includes("ECONNREFUSED")
      ) {
        console.log(`   💡 Backend server is not running or not accessible`);
        console.log(`   💡 Start backend with: npm run server:watch`);
      }
    }
    console.log("");
  }

  console.log("📋 Summary:");
  console.log("   - If health check fails: Backend server is not running");
  console.log(
    "   - If health check OK but profile fails: Database not connected or not seeded",
  );
  console.log(
    "   - If both return HTML: Frontend dev server is intercepting requests",
  );
  console.log("\n💡 To fix:");
  console.log("   1. Ensure backend is running: npm run server:watch");
  console.log("   2. Check MongoDB connection: npm run check:mongodb");
  console.log("   3. Seed database if needed: npm run seed");
};

// Use node-fetch if available, otherwise use built-in fetch (Node 18+)
if (typeof fetch === "undefined") {
  const { default: fetch } = require("node-fetch");
  testBackendAPI();
} else {
  testBackendAPI();
}
