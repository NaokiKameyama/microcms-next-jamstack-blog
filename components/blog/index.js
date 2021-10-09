import styles from '../../styles/Home.module.scss';
import Image from 'next/image'

export const Blog = ({ blog }) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <Image src={blog.image.url} width={blog.image.width} height={blog.image.height} alt="My avatar" />
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}
