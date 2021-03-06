module.exports = {
  siteUrl: "https://www.atukan-blog.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./out",
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/preview/", "/api/"],
      },
    ],
  },
};
