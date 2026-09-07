// ビルド／dev 起動時に記事の frontmatter を検証し、壊れた記事があれば止める
require("./scripts/check-posts").run({ exitOnError: true });

module.exports = {
  reactStrictMode: true,
  images: {
    // `next export` は画像最適化サーバーを持たないため、default ローダーだと失敗する。
    // 画像 URL をそのまま使うパススルーのローダー（libs/imageLoader.js）を使う。
    loader: "custom",
  },
  webpack5: true,
  webpack: (config) => {
    // content/posts/*.md を文字列として import できるようにする（lib/posts.js が使う）
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    return config;
  },
  // sitemap / RSS / llms.txt は API ルートで動的生成する（ビルド後に public/ へ書く方式は Vercel が取り込まない）
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      { source: "/feed.xml", destination: "/api/feed" },
      { source: "/llms.txt", destination: "/api/llms" },
      { source: "/llms-full.txt", destination: "/api/llms?full=1" },
    ];
  },
};
