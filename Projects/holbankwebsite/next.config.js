/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "de", "ru"],
    defaultLocale: "en"
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  }
}

module.exports = nextConfig;
