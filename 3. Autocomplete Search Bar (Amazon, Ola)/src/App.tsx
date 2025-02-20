import { useState } from "react";
import useFetchSearchResults from "./hooks/useFetchSearchResults";
import "./styles.css";

export default function App() {
  const [searchInput, setSearchInput] = useState("");

  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const { searchResults } = useFetchSearchResults(searchInput);

  return (
    <div className="App">
      <main>
        <h1>Autocomplete Search Bar</h1>
        <div className="search-container">
          <input
            type="search"
            name="search"
            className="search-input"
            value={searchInput}
            onChange={(event) => setSearchInput(event?.target?.value || "")}
            onFocus={() => setIsResultsVisible(true)}
            onBlur={() => setIsResultsVisible(false)}
            placeholder="Search for recipes..."
            autoComplete="off"
          />
          {isResultsVisible && searchInput && (
            <div className="search-results">
              <ul>
                {searchResults?.length > 0 ? (
                  searchResults.map((searchResult) => (
                    <li key={searchResult}>{searchResult}</li>
                  ))
                ) : (
                  <li>No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
