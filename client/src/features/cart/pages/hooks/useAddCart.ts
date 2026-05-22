import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../type/cartItem";

export function useAddCartItem() {
    
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: CartItem) => product,

    onSuccess: (product) => {
        queryClient.setQueryData(["cart"], (oldData: any) => {
          const cart = oldData.carts[0];
      
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
      }
  });
}