import Home from "../components/home";
import Seo from "../components/Seo";
import { getAllPosts, getCategories } from "../lib/posts";
import type { Post, Category } from "../lib/types";

interface Props {
  blog: Post[];
  categoryData: Category[];
}

export default function Index({ blog, categoryData }: Props) {
  return (
    <>
      <Seo path="/" />
      <Home blog={blog} categoryData={categoryData} />
    </>
  );
}

export const getStaticProps = async () => {
  const blog: Post[] = getAllPosts();
  const categoryData: Category[] = getCategories(blog).map((name: string) => ({ id: name, name }));
  return { props: { blog, categoryData } };
};
