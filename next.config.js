/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "plus.unsplash.com",
      "images.trvl-media.com",
    ],
  },
};

module.exports = nextConfig;
