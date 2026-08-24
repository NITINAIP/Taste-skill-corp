import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Only used when NEXT_PUBLIC_IMAGE_MODE=remote. In the default placeholder
    // mode every image is a local SVG served straight from /public and passed
    // through next/image with `unoptimized`, so no remote host is contacted.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
}

export default nextConfig
