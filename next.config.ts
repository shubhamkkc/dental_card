
/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
   basePath: '/dental_card',
  assetPrefix: '/dental_card', 
  /* config options here */
   output: 'export', // This creates a static 'out' folder
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
