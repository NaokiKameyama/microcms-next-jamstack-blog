import Profile from "../components/profile";
import Seo from "../components/Seo";

export default function ProfilePage() {
  return (
    <>
      <Seo
        title="プロフィール"
        description="亀山直起のプロフィール。デジタル庁のプロダクトマネージャー、株式会社みんがくの取締役CTO。経歴・特許・開発したサービス・保有資格をまとめています。"
        path="/profile"
        type="profile"
        breadcrumbs={[{ name: "ホーム", path: "/" }, { name: "プロフィール", path: "/profile" }]}
      />
      <Profile />
    </>
  );
}
