import Link from "next/link";
import { client } from "../libs/client";
import Head from "next/head";
import Card from "../components/card";
import Home from "../components/home";

interface Category {
  name: string;
}

interface Blog {
  image: string;
  title: string;
  body: string;
  category: string;
  isPremium: boolean;
}

interface Props {
  blog: Blog;
  categoryData: Category;
}

export default function Home2({ blog, categoryData }: Props) {
  return <Home blog={blog} categoryData={categoryData} />;
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data: { contents: Blog } = await client.get({
    endpoint: "blog",
    queries: {
      offset: 0,
      limit: 20,
    },
  });
  const categoryData: { contents: Category } = await client.get({
    endpoint: "categories",
  });

  return {
    props: {
      blog: data.contents,
      categoryData: categoryData.contents,
    },
  };
};
