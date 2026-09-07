import Home from "../../components/home";
import Seo from "../../components/Seo";
import { getAllPosts, getCategories, categoryPath } from "../../lib/posts";
import type { Post, Category } from "../../lib/types";

interface Props {
  name: string;
  blog: Post[];
  categoryData: Category[];
}

// カテゴリごとの記事一覧。トップのタブから遷移する。
// クロール可能な URL を持たせることで、カテゴリ単位のテーマ性を検索エンジンに伝える。
export default function CategoryPage({ name, blog, categoryData }: Props) {
  return (
    <>
      <Seo
        title={`${name}の記事一覧`}
        description={`あつかんブログの「${name}」カテゴリの記事${blog.length}件。${
          name === "技術" ? "TypeScript、Next.js、生成AIなど実際に手を動かして分かったこと" :
          name === "金融" ? "資産運用やポートフォリオなど、自分のお金で試したこと" :
          name === "働き方" ? "PMとエンジニアの両方をやってきた経験から、仕事の進め方や道具について" :
          "ガジェットやレビューなど"
        }を書いています。`}
        path={categoryPath(name)}
        breadcrumbs={[{ name: "ホーム", path: "/" }, { name, path: categoryPath(name) }]}
      />
      <Home blog={blog} categoryData={categoryData} category={name} />
    </>
  );
}

export const getStaticPaths = async () => ({
  paths: getCategories(getAllPosts()).map((name: string) => ({ params: { name } })),
  fallback: false,
});

export const getStaticProps = async ({ params }: { params: { name: string } }) => {
  const all: Post[] = getAllPosts();
  const categoryData: Category[] = getCategories(all).map((name: string) => ({ id: name, name }));
  const blog = all.filter((p) => p.category.name === params.name);
  if (blog.length === 0) return { notFound: true };
  return { props: { name: params.name, blog, categoryData } };
};
