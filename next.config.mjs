import withPlaiceholder from '@plaiceholder/next';
const webpack = require('webpack');

const isVercel = process.env.VERCEL === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
      },
    ],
  },
  // Merge webpack configurations into a single function
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Apply ContextReplacementPlugin
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/\/keyv\//, (data) => {
        delete data.dependencies[0].critical;
        return data;
      })
    );

    // Alias settings
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Conditionally externalize 'sharp' for Vercel deployments
    if (isServer && isVercel) {
      config.externals.push({
        sharp: 'commonjs sharp'
      });
    }

    return config;
  },
};

export default withPlaiceholder(nextConfig);
