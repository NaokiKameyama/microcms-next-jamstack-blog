import Profile from "../components/profile";
import Seo from "../components/Seo";

interface Props {
  now: string;
}

export default function ProfilePage({ now }: Props) {
  return (
    <>
      <Seo
        title="プロフィール"
        description="亀山直起のプロフィール。デジタル庁のプロダクトマネージャー、株式会社みんがくの取締役CTO。経歴・特許・開発したサービス・保有資格をまとめています。"
        path="/profile"
        type="profile"
        breadcrumbs={[{ name: "ホーム", path: "/" }, { name: "プロフィール", path: "/profile" }]}
      />
      <Profile now={now} />
    </>
  );
}

// 経歴グラフの右端「現在」はビルド時の年月（JST）。デプロイのたびに更新される。
export const getStaticProps = async () => {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const now = `${jst.getUTCFullYear()}-${String(jst.getUTCMonth() + 1).padStart(2, "0")}`;
  return { props: { now } };
};
