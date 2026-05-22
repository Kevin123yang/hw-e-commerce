import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useClearCart() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async () => true,
  
      onSuccess: () => {
        queryClient.setQueryData(["cart"], (oldData: any) => {
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