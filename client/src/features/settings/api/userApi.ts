import { axiosClient } from "../../../lib/axiosClient";
import type { UpdateUserInput } from "../type/user";

export async function fetchUser() {
  const res = await axiosClient.get("/users/1");
  return res.data;
}

export async function updateUser(input: UpdateUserInput) {
  const res = await axiosClient.put("/users/1", input);
  return res.data;
}