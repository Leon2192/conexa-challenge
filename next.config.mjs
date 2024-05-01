/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "rickandmortyapi.com"],
  },
  metadata: {
    title: "Your App Title",
    description: "Your App Description",
    icons: {
      icon: "/logo.png", 
    },
  },
};

export default nextConfig;
