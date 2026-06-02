import * as cartRepository from "./cart.repository";
import {
  CreateCartInput,
  UpdateCartInput,
  AddCartItemInput,
} from "./cart.validator";

export async function getCarts() {
  return cartRepository.findAllCarts();
}

export async function getCartsById(id: number) {
  return cartRepository.getCartById(id);
}

export async function createCarts(cart: CreateCartInput) {
  return cartRepository.createCarts(cart);
}

export async function updateCarts(
  cartId: number,
  updatedCart: UpdateCartInput
) {
  return cartRepository.updateCarts(cartId, updatedCart);
}

export async function deleteCarts(cartId: number) {
  return cartRepository.deleteCarts(cartId);
}

export async function addItemToCart(
  cartId: number,
  item: AddCartItemInput
) {
  
  return cartRepository.addItemToCart(cartId, item);
}

export async function removeItemToCart(cartId: number, productId: number) {
  return cartRepository.removeItemToCart(cartId, productId);
}