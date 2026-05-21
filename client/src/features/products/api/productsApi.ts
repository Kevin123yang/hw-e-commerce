import { axiosClient } from "../../../lib/axiosClient";
import type {  Product } from "../type/products";
import type { ProductsFilers } from "../type/ProductsFilers";

export async function fetchProducts(filters?: ProductsFilers) {
  const res = await axiosClient.get("/products", {
    params: filters,
  });

  return res.data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data;
}


