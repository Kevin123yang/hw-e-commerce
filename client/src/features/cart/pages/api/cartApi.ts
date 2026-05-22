import { axiosClient } from "../../../../lib/axiosClient";

export async function fetchCart() {
    const res = await axiosClient.get("/cart");
  
    return res.data;
  }