import Head from "next/head";
import site from "../../lib/site";

// 全ページ共通の <head>。旧 commonMeta は description が property 属性（正しくは name）で
// 中身が本文 HTML だったため、検索結果に説明文が出ていなかった。
export default function Seo({ title, description, path = "/", image, type = "website", post }) {
  const fullTitle = title ? `${title} | ${site.name}` : site.name;
  const desc = description || site.description;
  const url = site.url + path;
  const img = site.url + (image || site.defaultImage);
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: desc,
        image: img,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { "@type": "Person", name: site.author, url: `${site.url}/profile` },
        mainEntityOfPage: url,
      }
    : { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url };
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || site.name} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitter} />
      {post && <meta property="article:published_time" content={post.publishedAt} />}
      {post && <meta property="article:modified_time" content={post.updatedAt} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}
