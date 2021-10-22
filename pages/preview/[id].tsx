// import { Blog } from "../../components/blog";
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';
import Article from "../../components/Article"
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';

export default function BlogId({ blog, highlightedBody}) {
  return (
    <>
      <p>※Preview Mode</p>
      <Article blog={blog} highlightedBody={highlightedBody} />
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data: {contents: []} = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: {id: string}) => `/preview/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;

  // draftKeyを取得し、クエリを作成する
  const draftKey = context.previewData?.draftKey
    ? { draftKey: context.previewData.draftKey }
    : {};

  const data: {body: string} = await client.get({
    endpoint: "blog",
    contentId: id,
    queries: draftKey,
  });

  // 記事が存在しなければ404エラーを返す
  if (!data) {
    return { notFound: true }
  }

  const $ = cheerio.load(data.body);    // data.bodyはmicroCMSから返されるリッチエディタ部分
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blog: data,
      highlightedBody:$.html(),
      ...draftKey,
    },
  };
}