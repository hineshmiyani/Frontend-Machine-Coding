import { useState } from "react";
import Pagination from "./components/Pagination";
import ProductCard from "./components/ProductCard";
import { PAGE_SIZE } from "./constants";
import useFetchProducts from "./hooks/useFetchProducts";
import "./styles.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { products } = useFetchProducts();

  const numOfPages = Math.ceil(products.length / PAGE_SIZE);
  const startProductIndex = (currentPage - 1) * PAGE_SIZE;
  const endProductIndex = currentPage * PAGE_SIZE;

  if (products.length === 0) {
    return (
      <div className="App">
        <h2>No Products found!</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Pagination</h1>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numOfPages={numOfPages}
      />

      <div className="products">
        {products
          .slice(startProductIndex, endProductIndex)
          .map(({ id, title, thumbnail, description }) => (
            <ProductCard key={id} {...{ id, title, thumbnail, description }} />
          ))}
      </div>
    </div>
  );
}
