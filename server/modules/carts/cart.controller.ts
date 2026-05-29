import { Request, Response } from "express";
import * as cartService from "./cart.service";

export function getCarts(_req: Request, res: Response) {
  const cart = cartService.getCarts();
  res.json(cart);
}
export function getCartsById(req: Request, res: Response) {
  const id = req.params.id as string;
  const cart = cartService.getCartsById(id);
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }
  res.json(cart);
}
export function createCarts(req: Request, res: Response) {
  const cart = cartService.createCarts(req.body);

  if (!cart) {
    return res.status(400).json({
      message: "User already has a cart",
    });
  }
  res.status(201).json(cart);
}
export function updateCarts(req: Request, res: Response) {
  const id = req.params.id as string;
  const updatedCart = req.body;
  const cart = cartService.updateCarts(id, updatedCart);
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  res.json(cart);
}
export function deleteCarts(req: Request, res: Response) {
  const id = req.params.id as string;
  const cart = cartService.deleteCarts(id);
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }
  res.json(cart);
}

export function addItemToCart(req: Request, res: Response) {
  const id = req.params.id as string;
  const item = req.body;
  const cart = cartService.addItemToCart(id, item);
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }
  res.status(201).json(cart);
}
export function removeItemToCart(req: Request, res: Response) {
  const id = req.params.id as string;
  const productId = Number(req.params.productId);
  const cart = cartService.removeItemToCart(id, productId);
  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }
  res.json(cart);
}
