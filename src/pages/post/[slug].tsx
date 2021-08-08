import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  // const words = RichText.asText(
  //   post.data.content.reduce((acc, content) => acc.concat(content.body), [])
  // ).split(' ').length;

  // const readingTime = Math.ceil(words / 200); // 200 words read by humans per minute

  const { isFallback } = useRouter();

  if (isFallback) return <div>Carregando...</div>;

  return (
    <>
      <Head>
        <title>Posts | Blog</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          {/* <img src={post.data.banner.url} alt="banner"/> */}
          <div className={styles.img}>
            <Image src={post.data.banner.url} alt="banner" layout="fill"/>
          </div>
          <strong>{post.data.title}</strong>
          <div className={styles.postInfo}>
            <FiCalendar />
            <time>
              {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </time>
            <FiUser />
            <span>{post.data.author}</span>
            {/* <FiClock /> */}
            {/* <span>{readingTime} min</span> */}
          </div>
          <div className={styles.body}>
            {post.data.content.map(content => (
              <div key={content.heading}>
                <strong>{content.heading}</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      pageSize: 10,
    }
  );

  return {
    paths: posts.results.map(post => {
      return { params: { slug: post.uid } };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug}: any = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60, // 1 hora
  };
};
