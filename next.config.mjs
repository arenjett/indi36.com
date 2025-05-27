// import nextPWA from "next-pwa";

// const withPWA = nextPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// export default withPWA({
//   reactStrictMode: true, // Enables React strict mode for additional checks
//   output: "export", // Exports the app as static HTML
//   images: {
//     unoptimized: true, // Disables image optimization for static exports
//   },
// });

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: [/dynamic-css-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^\/_next\/dynamic-css-manifest\.json$/,
      handler: "NetworkOnly",
    },
  ],
});

export default withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true, // Optional: for full control of images
  },

  async rewrites() {
    return [
      {
        source: "/manifest.json",
        destination: "/api/manifest",
      },
    ];
  },
});
