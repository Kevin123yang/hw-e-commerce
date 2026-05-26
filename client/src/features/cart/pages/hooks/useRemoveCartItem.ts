import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveCartItem(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      await new Promise((res) => setTimeout(res, 1000));
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.setQueryData(["cart", userId], (oldData: any) => {
        if (!oldData?.carts?.[0]) return oldData;
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
