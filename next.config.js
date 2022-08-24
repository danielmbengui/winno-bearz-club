///** @type {import('next').NextPageContext} */
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    //webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
        dirs: ['pages'],
    }
}

module.exports = nextConfig;