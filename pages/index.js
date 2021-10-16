import Link from "next/link";
import { client } from "../libs/client";
import Head from 'next/head'
import Card from '../components/card'
import Home from '../components/home'

export default function Home2({ blog, categoryData }) {
  return (
    <Home blog={blog} categoryData={categoryData} />
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      categoryData: categoryData.contents
    },
  };
};