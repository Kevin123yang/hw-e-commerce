import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/userApi";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
}