const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  experimental: {
    mdxRs: true
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: []
  }
};

module.exports = withContentlayer(nextConfig);
