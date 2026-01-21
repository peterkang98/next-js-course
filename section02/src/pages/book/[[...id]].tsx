import {useRouter} from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router)
  return <h1>Book {router.query.id}</h1>
};