// import { Blog } from "../../components/blog";
import { client } from "../../libs/client";
import styles from '../../styles/Home.module.scss';
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';
import Article from "../../components/Article"

export default function BlogId({blog ,highlightedBody}) {
  return (
    <Article blog={blog} highlightedBody={highlightedBody} />
    // <Blog blog={blog} highlightedBody={highlightedBody} />
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  const $ = cheerio.load(data.body);    // data.bodyはmicroCMSから返されるリッチエディタ部分
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blog: data,
      highlightedBody:$.html()
    },
  };
};


