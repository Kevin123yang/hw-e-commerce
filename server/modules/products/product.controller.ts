import { Request, Response } from "express";
import * as productService from "./product.service";

import {createProductSchema} from "./product.validator"

export async function getProducts(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 10;
  const skip = Number(req.query.skip) || 0;
  const search = req.query.search as string | undefined;
  const products = await productService.getProducts({
    limit,
    skip,
    search,
  });

  res.json(products);
}
export async function createProduct(req: Request, res: Response) {
  const result = createProductSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  const product = await productService.createProduct({
    title: result.data.title,
    price: result.data.price,
  });

  res.status(201).json(product);
}
export async function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id)
  const product = await productService.getProductById(id)
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
}

