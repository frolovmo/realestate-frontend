//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/kataza/" : "",
  images: {
    loader: "default",
    path:
      process.env.NODE_ENV === "production"
        ? "/kataza/_next/image"
        : "/_next/image/",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bucket.brd.rw",
        port: "",
        pathname: "/*/**",
        search: "",
      },
    ],
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
