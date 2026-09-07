import Head from "next/head";
import site from "../../lib/site";

const PERSON_ID = `${site.url}/profile#person`;
const WEBSITE_ID = `${site.url}/#website`;

// 著者（E-E-A-T 用）。すべてのページの @graph に含め、記事の author から @id で参照する
const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.author.name,
  alternateName: site.author.alternateName,
  jobTitle: site.author.jobTitle,
  description: site.author.description,
  url: site.author.url,
  sameAs: site.author.sameAs,
};

const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: site.language,
  publisher: { "@id": PERSON_ID },
};

export default function Seo({ title, description, path = "/", image, type = "website", post, breadcrumbs, noindex }) {
  const isHome = path === "/";
  const fullTitle = isHome ? `${site.name} | ${site.tagline}` : title ? `${title} | ${site.name}` : site.name;
  const desc = description || site.description;
  const url = site.url + path;
  const img = site.url + (image || site.ogImage);

  const graph = [websiteNode, personNode];
  if (post) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: desc,
      image: img,
      url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: site.language,
      articleSection: post.category?.name,
      keywords: post.category?.name,
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      isPartOf: { "@id": WEBSITE_ID },
    });
  }
  if (breadcrumbs && breadcrumbs.length) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: site.url + b.path,
      })),
    });
  }
  if (path === "/profile") {
    graph.push({ "@type": "ProfilePage", "@id": `${url}#page`, url, name: fullTitle, mainEntity: { "@id": PERSON_ID } });
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="author" content={site.author.name} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url} />
      <link rel="alternate" type="application/rss+xml" title={site.name} href={`${site.url}/feed.xml`} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={isHome ? site.name : title || site.name} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content={post?.image?.width ? String(post.image.width) : "1200"} />
      <meta property="og:image:height" content={post?.image?.height ? String(post.image.height) : "630"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.author.twitter} />
      <meta name="twitter:creator" content={site.author.twitter} />
      {post && <meta property="article:published_time" content={post.publishedAt} />}
      {post && <meta property="article:modified_time" content={post.updatedAt} />}
      {post && <meta property="article:author" content={site.author.url} />}
      {post && post.category && <meta property="article:section" content={post.category.name} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
      />
    </Head>
  );
}
