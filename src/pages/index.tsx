import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Prismic from '@prismicio/client';
import styles from './Home.module.scss'
import {FiCalendar, FiUser} from 'react-icons/fi'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../services/prismic';

type Post = {
  uid?: string;
  first_publication_date: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

type PostPagination = {
  next_page: string;
  results: Post[];
}

type HomeProps = {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {

  const [posts, setPosts] = React.useState<Post[]>(postsPagination.results)
  const [nextPage, setNextPage] = React.useState(postsPagination.next_page)

  async function handleLoadMorePosts(): Promise<void> {
    const postsResponse: PostPagination = await fetch(
      postsPagination.next_page
    ).then(res => res.json())

    const results = postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      }
      setPosts([...posts, ...results])
      setNextPage(postsResponse.next_page)
    })

  }
  return (
    <>
      <Head>
        <title>Home | Blog</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <FiCalendar />
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
                <FiUser />
                <span>{post.data.author}</span>
              </a>
            </Link>
          ))}
          {nextPage && (
            <button
              className={styles.loadMore}
              type="button"
              onClick={handleLoadMorePosts}
            >
              Carregar mais posts
            </button>
          )}

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: [
        'post.banner',
        'post.title',
        'post.subtitle',
        'post.author',
        'post.content',
      ],
      pageSize: 10,
    }
  )

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      }
    }
  })

  return {
    props: {
      postsPagination: {
        results,
        next_page: postsResponse.next_page,
      }
    }
  }
  
}