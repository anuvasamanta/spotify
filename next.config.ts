// import type { NextConfig } from "next";

import { NextConfig } from "next"

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
// import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Build settings
  output: 'standalone', // or 'export' for static sites
  distDir: '.next', // default build directory
  productionBrowserSourceMaps: true, // generate source maps
  typescript: {
    ignoreBuildErrors: false, // set true to bypass TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // set false to enforce ESLint during build
  },
  images: {
    domains: ['example.com'], // allowed image domains
  },
  
}

export default nextConfig