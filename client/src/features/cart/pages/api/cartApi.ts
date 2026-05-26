import { axiosClient } from "../../../../lib/axiosClient";

export async function fetchCart(userId:number) {
    const res = await axiosClient.get(`/carts/user/${userId}`);
  
    return res.data;
  }