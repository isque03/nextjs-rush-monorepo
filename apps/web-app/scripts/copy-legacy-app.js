const fs = require("fs");
const path = require("path");

// Path to the built legacy app in node_modules
const sourcePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@myorg",
  "legacy-extjs-app",
  "dist",
  "legacy-app.min.js"
);

// Destination in Next.js public folder
const publicLegacyDir = path.join(__dirname, "..", "public", "legacy");
const destPath = path.join(publicLegacyDir, "legacy-app.min.js");

// Ensure public/legacy directory exists
if (!fs.existsSync(publicLegacyDir)) {
  fs.mkdirSync(publicLegacyDir, { recursive: true });
}

// Check if source file exists
if (!fs.existsSync(sourcePath)) {
  console.warn(
    `Legacy app not found at ${sourcePath}. Building @myorg/legacy-extjs-app...`
  );
  
  // Try to build the package
  const { execSync } = require("child_process");
  const monorepoRoot = path.join(__dirname, "..", "..", "..");
  
  try {
    console.log("Running: rush build --to @myorg/legacy-extjs-app");
    execSync("rush build --to @myorg/legacy-extjs-app", {
      cwd: monorepoRoot,
      stdio: "inherit",
    });
    
    // Check again after build
    if (!fs.existsSync(sourcePath)) {
      console.error(`Build completed but file still not found at ${sourcePath}`);
      process.exit(1);
    }
    console.log("Legacy app built successfully");
  } catch (error) {
    console.error("Failed to build legacy app:", error.message);
    console.warn("You can manually build it with: rush build --to @myorg/legacy-extjs-app");
    process.exit(1);
  }
}

// Copy the file
try {
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied legacy app to ${destPath}`);
} catch (error) {
  console.error(`Error copying legacy app:`, error);
  process.exit(1);
}

