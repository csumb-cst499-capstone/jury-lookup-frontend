/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_IP: "localhost",
    SERVER_PORT: 3000,
  },
  eslint: {
    dirs: ["app", "components"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

module.exports = nextConfig;
