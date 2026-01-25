import {BookData} from "@/types";

export default async function fetchBooks(queryParam?: string): Promise<BookData[]> {
  let url = `https://onebite-books-server-main-kappa-sepia.vercel.app/book`;

  if (queryParam) {
    url += `/search?q=${queryParam}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};