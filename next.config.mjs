import withPlaiceholder from '@plaiceholder/next';
import webpack from 'webpack';

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
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/\/keyv\//, (data) => {
        delete data.dependencies[0].critical;
        return data;
      })
    );

    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    if (isServer && isVercel) {
      config.externals.push({
        sharp: 'commonjs sharp',
      });
    }

    return config;
  },
};

export default withPlaiceholder(nextConfig);
