import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../api/cartApi";

export function useCart(userId?: number) {
  return useQuery({
    queryKey: ["cart",userId],
    queryFn: ()=> fetchCart(userId!),
  });
}