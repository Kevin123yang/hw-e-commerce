import { NewProduct } from "../../src/db/schema";
import * as productRepository from "./product.repository"

export async function getProducts({
  limit,
  skip,
  search,
}: {
  limit: number;
  skip: number;
  search?: string;
}) {
  return productRepository.getProducts({
    limit,
    skip,
    search,
  });
}
export async function getProductById( id:number) {
  
  
  return productRepository.getProductById(id);
}

export async function createProduct(data: NewProduct) {
  return productRepository.createProduct(data);
}