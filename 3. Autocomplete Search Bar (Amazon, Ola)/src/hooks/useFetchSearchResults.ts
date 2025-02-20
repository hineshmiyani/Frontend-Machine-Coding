import { useState, useEffect } from "react";

const useFetchSearchResults = (searchInput: string) => {
  const [searchResults, setSearchResults] = useState([]);
  const [cacheResults, setCacheResults] = useState({});

  const fetchSearchResults = async (searchInput: string) => {
    if (searchInput in cacheResults) {
      console.log("CACHE RETUREND! ", searchInput, cacheResults);
      setSearchResults(cacheResults[searchInput as keyof typeof cacheResults]);
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchInput}`
      );

      if (res.ok) {
        const data = res ? await res.json() : null;

        const results = data?.recipes?.map(({ name }: any) => name);

        setSearchResults(results);
        setCacheResults((cache) => ({ ...cache, [searchInput]: results }));
      } else {
        const error = res ? await res.json() : null;

        throw new Error(error?.message || res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let timeoutId: any;
    if (searchInput) {
      timeoutId = setTimeout(async () => {
        fetchSearchResults(searchInput);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [searchInput]);

  return { searchResults };
};

export default useFetchSearchResults;
