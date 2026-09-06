module.exports = {
  siteUrl: "https://www.atukan-blog.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Vercel は out/（next export の出力）ではなく public/ を配信するため、
  // 生成物は public/ に出す。生成物は .gitignore 済み（ビルド時に毎回作られる）。
  outDir: "./public",
  // robots で拒否しているプレビュー、未完成のページネーションはサイトマップに載せない
  exclude: ["/preview/*", "/blog/page/*", "/404"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/preview/", "/api/", "/blog/page/"],
      },
    ],
  },
};
