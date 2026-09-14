import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Self-contained build output — required for Docker/container deployments.
  output: 'standalone',
  reactStrictMode: true,
  // Stable in Next 16. Automatically memoises components; the codebase already
  // satisfies the compiler's rules, which is what the lint run enforces.
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // three.js ships untranspiled ESM examples; let Next bundle them properly.
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
