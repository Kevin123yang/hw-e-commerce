import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/productsApi";
import type { Product } from "../type/products";

export function useProduct(id:number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: ()=> fetchProduct(id),
  });
}