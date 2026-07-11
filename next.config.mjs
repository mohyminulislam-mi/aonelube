/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure the API URL is always available at build and runtime.
  // NEXT_PUBLIC_API_URL should be set in Vercel's Environment Variables
  // dashboard to point to your deployed backend (e.g. https://aonelube-server.vercel.app).
  // For local development, .env.local overrides this with http://localhost:5000.
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://aonelube-server.vercel.app",
  },

  images: {
    remotePatterns: [
      {
        // Unsplash — used for hero slides, category banners, and product fallback images
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Cloudinary — used for uploaded product/category images from the backend
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Pexels — existing product images referenced in the project
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
