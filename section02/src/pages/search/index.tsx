import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";

export default function Page() {
  return <h1>Search</h1>;
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
};