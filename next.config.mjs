/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'frontend-take-home.fetch.com',
            protocol: 'https',
        }],
    },
};

export default nextConfig;
