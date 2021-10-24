import Link from 'next/link';
import { Pagination } from '../../../components/pagination';

const PER_PAGE = 5;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
  return (
    <div>
      <ul>
        {blog.map(blog => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  console.log(111)
  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
  };

  const res = await fetch('https://atukan0930.microcms.io/api/v1/blog', key)

  const repos = await res.json();

  const pageNumbers = [];

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) =>  `/blog/page/${repo}`)

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
  };

  const data = await fetch(
    `https://atukan0930.microcms.io/api/v1/blog?offset=${(id - 1) * 5}&limit=5`,
    key
  ).then(res => res.json()).catch(() => null)

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    }
  };
};