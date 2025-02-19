import { useEffect, useState } from "react";
import { Product } from "../types";

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=200");

      if (res.ok) {
        const data = res && (await res.json());
        setProducts(data?.products as Product[]);
      } else {
        throw new Error(res.statusText || "Something went wrong!");
      }
    } catch (error) {
      // alert((error as any)?.message);
      console.log({ error });
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, setProducts };
};

export default useFetchProducts;
