import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../type/cartItem";

export function useAddCartItem(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: CartItem) => {
      await new Promise((res) => setTimeout(() => res(null), 1000));
      return product;
    },

    onSuccess: (product) => {
      queryClient.setQueryData(["cart", userId], (oldData: any) => {
        const cart = oldData?.carts?.[0] ?? {
          id: 1,
          userId,
          products: [],
          total: 0,
        };
        const existingProduct = cart.products.find(
          (item: CartItem) => item.id === product.id
        );

        let newProducts;

        if (existingProduct) {
          newProducts = cart.products.map((item: CartItem) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: (item.quantity + 1) * item.price,
                }
              : item
          );
        } else {
          newProducts = [...cart.products, product];
        }

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
