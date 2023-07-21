/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: `http://localhost:3000`,

  env: {
    API_URL: "http://localhost:8080",
    BASE_URL: "http://localhost:3000",
  },
  eslint: {
    dirs: ["app", "components"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

module.exports = nextConfig;
