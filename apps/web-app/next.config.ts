/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "../../", // point 2 levels up to your monorepo root
  },
  transpilePackages: ["@myorg/shared-lib"],
};

module.exports = nextConfig;
