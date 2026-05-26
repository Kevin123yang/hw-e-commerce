import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useClearCart(userId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await new Promise((res) => setTimeout(res, 1000));
      return true;
    },

    onSuccess: () => {
      queryClient.setQueryData(["cart", userId], (oldData: any) => {
        if (!oldData?.carts?.[0]) return oldData;
        const cart = oldData.carts[0];

        return {
          ...oldData,
          carts: [
            {
              ...cart,
              products: [],
              total: 0,
            },
          ],
        };
      });
    },
  });
}
