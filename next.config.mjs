/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/lessons", destination: "/courses/kotlin/lessons", permanent: false },
      { source: "/lessons/:lessonId", destination: "/courses/kotlin/lessons/:lessonId", permanent: false },
    ];
  },
};

export default nextConfig;
