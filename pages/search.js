import Head from "next/head";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import Response from "../Response";
import { useRouter } from "next/router";

const search = ({ results }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{router.query.term} - Search Page</title>
      </Head>
      {/* search header */}
      <SearchHeader />
      {/* search results */}
      <SearchResults results={results} />
    </div>
  );
};

export default search;

export async function getServerSideProps(context) {
  const mockData = true;
  const data = mockData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${
          process.env.API_KEY
        }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
          context.query.searchType && `&searchType=image`
        }`
      ).then((response) => response.json());
  return {
    props: {
      results: data,
    },
  };
}
