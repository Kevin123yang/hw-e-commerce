import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/userApi";
import type { UpdateUserInput } from "../type/user";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser);
    },
  });
}