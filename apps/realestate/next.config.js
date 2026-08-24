//@ts-check

const { composePlugins, withNx } = require("@nx/next");

const bucketName = process.env.BUCKET_NAME ? `/${process.env.BUCKET_NAME}` : "";
const bucketPrefix = process.env.BUCKET_PREFIX
  ? `/${process.env.BUCKET_PREFIX}`
  : "";
const bucketDomain = process.env.BUCKET_ENDPOINT;

const prefix = process.env.NODE_ENV === "production" ? "/realestate/" : "";

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*.brd.rw"],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `${prefix}/bucket/pdf/:path*`,
        destination: `${bucketDomain}${bucketName}${bucketPrefix}/:path*`,
      },
      {
        source: `${prefix}/bucket/video/:path*`,
        destination: `${bucketDomain}${bucketName}${bucketPrefix}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, canvas: false };
    return config;
  },
  assetPrefix: prefix,
  images: {
    loader: "default",
    path:
      process.env.NODE_ENV === "production"
        ? "/realestate/_next/image"
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
  typescript: {
    // Enable type checking for production builds
    ignoreBuildErrors: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
