import Contact from "../components/contact";
import Seo from "../components/Seo";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="お問い合わせ"
        description="あつかんブログへのお問い合わせフォームです。記事へのご指摘、お仕事のご相談はこちらからお送りください。"
        path="/contact"
        breadcrumbs={[{ name: "ホーム", path: "/" }, { name: "お問い合わせ", path: "/contact" }]}
      />
      <Contact />
    </>
  );
}
