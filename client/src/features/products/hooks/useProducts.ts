import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productsApi";
import type { ProductsFilers } from "../type/ProductsFilers";


export function useProducts(filers?: ProductsFilers) {
  return useQuery({
    queryKey: ["products", filers],
    queryFn: ()=> fetchProducts(filers),
  });
}