import styles from "./index.module.css"
import {ReactNode, useEffect} from "react";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType, InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
  console.log("인덱스 페이지")
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(), fetchRandomBooks()
  ])
  return {
    props: {
      allBooks,
      recommendedBooks
    },
    // revalidate: 4,  // 4초마다 정적 페이지 재생성
  }
};

export default function Home({ allBooks, recommendedBooks }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendedBooks.map(book => <BookItem key={book.id} {...book}/>)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map(book => <BookItem key={book.id} {...book}/>)}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
};
