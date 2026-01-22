import styles from "./index.module.css"
import {ReactNode, useEffect} from "react";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(), fetchRandomBooks()
  ])
  return {
    props: {
      allBooks,
      recommendedBooks
    }
  }
};

export default function Home({ allBooks, recommendedBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

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
