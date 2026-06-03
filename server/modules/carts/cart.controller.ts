import { Request, Response } from "express";
import * as cartService from "./cart.service";
import {
  createCartSchema,
  addCartItemSchema,
  updateCartSchema,
} from "./cart.validator";

export async function getCarts(req: Request, res: Response) {
  const currentUserId = (req as any).userId;

  const carts = await cartService.getCarts();

  const myCarts = carts.filter((item: any) => {
    return item.carts.userId === currentUserId;
  });

  res.json(myCarts);
}

export async function getCartsById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const cart = await cartService.getCartsById(id);

  if (cart.length === 0) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  const cartOwnerId = cart[0].carts.userId;
  const currentUserId = (req as any).userId;

  if (currentUserId !== cartOwnerId) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  res.json(cart);
}

export async function createCarts(req: Request, res: Response) {
  const result = createCartSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  const cart = await cartService.createCarts(result.data);

  if (!cart) {
    return res.status(400).json({
      message: "User already has a cart",
    });
  }

  res.status(201).json(cart);
}

export async function updateCarts(req: Request, res: Response) {
  const id = Number(req.params.id);

  const result = updateCartSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  const cart = await cartService.updateCarts(id, result.data);

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.json(cart);
}

export async function deleteCarts(req: Request, res: Response) {
  const id = Number(req.params.id);
  const cart = await cartService.deleteCarts(id);

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.json(cart);
}

export async function addItemToCart(req: Request, res: Response) {
  const id = Number(req.params.id);

  const result = addCartItemSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  const cart = await cartService.addItemToCart(id, result.data);

  if (cart === "cart_not_found") {
    return res.status(404).json({
      message: "Cart not found",
    });
  }
  if (cart === "product_not_found") {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  

  res.status(201).json(cart);
}

export async function removeItemToCart(req: Request, res: Response) {
  const id = Number(req.params.id);
  const productId = Number(req.params.productId);

  const cart = await cartService.removeItemToCart(id, productId);

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.json(cart);
}