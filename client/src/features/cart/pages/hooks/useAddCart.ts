import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../type/cartItem";

export function useAddCartItem() {
    
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: CartItem) => product,

    onSuccess: (product) => {
      queryClient.setQueryData(["cart"], (oldData: any) => {
        const cart = oldData.carts[0];

        const newProducts = [...cart.products, product];

        return {
          ...oldData,
          carts: [
            {
              ...cart,
              products: newProducts,
              total: newProducts.reduce(
                (sum: number, item: CartItem) => sum + item.total,
                0
              ),
            },
          ],
        };
      });
    },
  });
}