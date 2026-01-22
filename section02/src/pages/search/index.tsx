import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryParam = context.query.q;
  const books = await fetchBooks(queryParam as string);

  return {
    props: {
      books
    }
  }
};

export default function Page({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {books.map(book => <BookItem key={book.id} {...book}/>)}
    </div>
  );
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
};