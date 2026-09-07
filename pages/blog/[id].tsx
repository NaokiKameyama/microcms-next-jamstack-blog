import "highlight.js/styles/vs2015.css";
import Article from "../../components/Article";
import Seo from "../../components/Seo";
import { getAllPosts, getPost, getRelatedPosts, renderPostHtml, categoryPath } from "../../lib/posts";
import type { Post } from "../../lib/types";

interface Props {
  blog: Post;
  highlightedBody: string;
  related: Post[];
}

const BlogId = ({ blog, highlightedBody, related }: Props) => (
  <>
    <Seo
      title={blog.title}
      description={blog.description}
      path={`/blog/${blog.id}`}
      image={blog.image.url}
      type="article"
      post={blog}
      breadcrumbs={[
        { name: "ホーム", path: "/" },
        { name: blog.category.name, path: categoryPath(blog.category.name) },
        { name: blog.title, path: `/blog/${blog.id}` },
      ]}
    />
    <Article blog={blog} highlightedBody={highlightedBody} related={related} />
  </>
);

export const getStaticPaths = async () => ({
  paths: getAllPosts().map((post: Post) => `/blog/${post.id}`),
  fallback: false,
});

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const post = getPost(params.id);
  if (!post) return { notFound: true };
  const { content, ...blog } = post;
  return {
    props: {
      blog,
      highlightedBody: renderPostHtml(content),
      related: getRelatedPosts(post, getAllPosts()),
    },
  };
};

export default BlogId;
