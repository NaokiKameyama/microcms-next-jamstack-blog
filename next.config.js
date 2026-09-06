module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"],
    // `next export` は Next.js 標準の画像最適化サーバーを持たないため、
    // default ローダーのままだと export が失敗する。画像 URL をそのまま使う
    // パススルーのローダー（libs/imageLoader.js）に切り替える。
    loader: "custom",
  },
  webpack5: true,
  // /sitemap.xml は API ルート（pages/api/sitemap.js）で動的生成する。
  // ビルド後に public/ へ書き出す方式は Vercel が取り込まないため。
  async rewrites() {
    return [{ source: "/sitemap.xml", destination: "/api/sitemap" }];
  },
};
