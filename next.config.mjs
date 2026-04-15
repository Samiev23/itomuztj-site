/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" }],
  },
  async redirects() {
    return [
      { source: "/lessons", destination: "/courses/kotlin/lessons", permanent: false },
      { source: "/lessons/:lessonId", destination: "/courses/kotlin/lessons/:lessonId", permanent: false },
    ];
  },
};

export default nextConfig;
