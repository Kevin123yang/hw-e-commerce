import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveCartItem() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (productId: number) => productId,
  
      onSuccess: (productId) => {
        queryClient.setQueryData(["cart"], (oldData: any) => {
          const cart = oldData.carts[0];
  
          const newProducts = cart.products.filter(
            (product: any) => product.id !== productId
          );
  
          return {
            ...oldData,
            carts: [
              {
                ...cart,
                products: newProducts,
                total: newProducts.reduce(
                  (sum: number, product: any) => sum + product.total,
                  0
                ),
              },
            ],
          };
        });
      },
    });
  }