import { GetStaticProps } from "next"
import Head from "next/head"
import * as Prismic from "@prismicio/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"
import styles from "./styles.module.scss"
import Link from "next/link"

interface PostsProps {
  posts: Post[]
}

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsFromCMS = await prismic.get({
    predicates: [
      Prismic.Predicates.at("document.type", "post"),
    ],
    fetch: [
      'post.title',
      'post.content',
    ],
    pageSize: 100,
  });

  const formattedPosts: Post[] = postsFromCMS.results.map(post => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }))

  return {
    props: {
      posts: formattedPosts
    },
  }
}
