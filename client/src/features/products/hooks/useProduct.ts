import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/productsApi";

export function useProduct(id:number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: ()=> fetchProduct(id),
  });
}