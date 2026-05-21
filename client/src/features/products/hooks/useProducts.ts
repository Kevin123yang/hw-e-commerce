import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productsApi";
import type { ProductsFilers } from "../type/ProductsFilers";
import type { ProductsResponse } from "../type/products";


export function useProducts(filers?: ProductsFilers) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", filers],
    queryFn: ()=> fetchProducts(filers),
  });
}