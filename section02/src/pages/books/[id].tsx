import styles from "@/pages/books/[id].module.css"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import {useRouter} from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths : [
      {params: {id: "1"}},
      {params: {id: "2"}},
      {params: {id: "3"}}
    ],
    // fallback: false // id가 1,2,3이 아니면 Not Found page를 리턴
    // fallback: "blocking" // SSR로 실시간 처리 + 1번 만들어진 페이지는 정적 페이지로 저장
    fallback: true // "blocking" 옵션이랑 비슷하지만, 초기 로딩을 빠르게 하기 위해 먼저 props가 없는 페이지를 리턴하고 나중에 props를 계산한걸 리턴
  }
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) return {notFound: true};

  return {
    props: {
      book
    }
  }
};

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if(router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요" />
        </Head>
        <div>로딩 중입니다.</div>
      </>
    );
  }

  const {id, title, subTitle, description, author, publisher, coverImgUrl} = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={styles.container}>
        <div
          className={styles.cover_img_container}
          style={{backgroundImage: `url('${coverImgUrl}')`}}
        >
          <img src={coverImgUrl}/>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.author}>{author} | {publisher}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </>
  );
};