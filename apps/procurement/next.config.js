//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, canvas: false };
    return config;
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/e-procurement/" : "",
  images: {
    loader: "default",
    path:
      process.env.NODE_ENV === "production"
        ? "/e-procurement/_next/image"
        : "/_next/image/",
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
