const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

const isWatch = process.argv.includes("--watch");

// Ensure dist directory exists
const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const buildOptions = {
  entryPoints: [path.join(__dirname, "src", "legacy-app.js")],
  bundle: false, // Don't bundle, just minify
  minify: true,
  outfile: path.join(distDir, "legacy-app.min.js"),
  format: "iife", // Keep as IIFE since it's already wrapped
  target: "es5", // Support older browsers
  logLevel: "info",
};

if (isWatch) {
  esbuild
    .context(buildOptions)
    .then((ctx) => {
      ctx.watch();
      console.log("Watching for changes...");
    })
    .catch((error) => {
      console.error("Build failed:", error);
      process.exit(1);
    });
} else {
  esbuild
    .build(buildOptions)
    .then(() => {
      console.log("Build completed successfully");
    })
    .catch((error) => {
      console.error("Build failed:", error);
      process.exit(1);
    });
}

