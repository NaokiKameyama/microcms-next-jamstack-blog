import Head from "next/head";

export default function CommonMeta({ blog }) {
  return (
    <Head>
      <title>{blog.title}</title>
      <meta property="description" content={blog.body} />
      <meta property="og:title" content={blog.title} />
      <meta property="og:description" content={blog.body} />
      <meta property="og:image" content={blog.image.url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
