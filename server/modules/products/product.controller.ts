import { Request, Response } from "express";
import * as productService from "./product.service";


export function getProducts(req: Request, res: Response) {
  const products = productService.getProducts();
  res.json(products)
}
// export function createProduct(req:Request, res:Response){
//   res.json({

//   })
// }
export function getProductById(req: Request, res: Response) {
  const id = req.params.id as string;
  const product = productService.getProductById(id)
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
}
