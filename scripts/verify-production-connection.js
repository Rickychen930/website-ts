/**
 * Verify Production Connection
 * Script untuk memverifikasi koneksi production antara frontend dan backend
 */

const https = require("https");
const http = require("http");

const PRODUCTION_DOMAIN = "https://rickychen930.cloud";
const BACKEND_PORT = 4000;

const testEndpoint = (url, description) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (url.startsWith("https") ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers: {
        "User-Agent": "Production-Verification-Script",
        Accept: "application/json",
      },
      timeout: 10000,
    };

    const req = client.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const contentType = res.headers["content-type"] || "";
        const isJSON = contentType.includes("application/json");

        if (res.statusCode === 200) {
          if (isJSON) {
            try {
              const json = JSON.parse(data);
              resolve({
                success: true,
                status: res.statusCode,
                data: json,
                description,
              });
            } catch (e) {
              resolve({
                success: false,
                status: res.statusCode,
                error: "Invalid JSON response",
                description,
              });
            }
          } else {
            resolve({
              success: false,
              status: res.statusCode,
              error: `Expected JSON but received ${contentType}`,
              description,
            });
          }
        } else {
          resolve({
            success: false,
            status: res.statusCode,
            error: data.substring(0, 200),
            description,
          });
        }
      });
    });

    req.on("error", (error) => {
      reject({
        success: false,
        error: error.message,
        description,
      });
    });

    req.on("timeout", () => {
      req.destroy();
      reject({
        success: false,
        error: "Request timeout",
        description,
      });
    });

    req.end();
  });
};

const verifyProductionConnection = async () => {
  console.log("🔍 Verifying Production Connection...\n");
  console.log(`🌐 Production Domain: ${PRODUCTION_DOMAIN}\n`);

  const tests = [
    {
      url: `${PRODUCTION_DOMAIN}/health`,
      description: "Health Check (via Nginx Proxy)",
    },
    {
      url: `${PRODUCTION_DOMAIN}/api/profile`,
      description: "Profile API (via Nginx Proxy)",
    },
    {
      url: `http://localhost:${BACKEND_PORT}/health`,
      description: "Backend Health Check (Direct - Server Only)",
      serverOnly: true,
    },
  ];

  const results = [];

  for (const test of tests) {
    if (test.serverOnly) {
      console.log(`⏭️  Skipping ${test.description} (server-only test)`);
      continue;
    }

    try {
      console.log(`Testing: ${test.description}`);
      console.log(`  URL: ${test.url}`);
      const result = await testEndpoint(test.url, test.description);
      results.push(result);

      if (result.success) {
        console.log(`  ✅ Success (HTTP ${result.status})`);
        if (result.data) {
          if (test.url.includes("/health")) {
            console.log(`  Response: ${JSON.stringify(result.data)}`);
          } else if (test.url.includes("/api/profile")) {
            console.log(
              `  Profile: ${result.data.name || "N/A"} - ${result.data.title || "N/A"}`,
            );
          }
        }
      } else {
        console.log(`  ❌ Failed (HTTP ${result.status})`);
        console.log(`  Error: ${result.error}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.error || error.message}`);
      results.push({
        success: false,
        error: error.error || error.message,
        description: test.description,
      });
    }
    console.log("");
  }

  // Summary
  console.log("📊 Summary:");
  const successCount = results.filter((r) => r.success).length;
  const totalCount = results.length;

  console.log(`  ✅ Passed: ${successCount}/${totalCount}`);
  console.log(`  ❌ Failed: ${totalCount - successCount}/${totalCount}\n`);

  if (successCount === totalCount) {
    console.log("✅ All production connection tests passed!");
    process.exit(0);
  } else {
    console.log("❌ Some tests failed. Please check the errors above.");
    console.log("\n💡 Troubleshooting Tips:");
    console.log("  1. Ensure backend is running: pm2 status");
    console.log("  2. Check nginx configuration: sudo nginx -t");
    console.log("  3. Verify CORS settings in .env file");
    console.log("  4. Check backend logs: pm2 logs website-backend");
    console.log("  5. Verify MongoDB connection: npm run check:mongodb");
    process.exit(1);
  }
};

// Run verification
verifyProductionConnection();
