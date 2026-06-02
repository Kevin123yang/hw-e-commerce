import { db } from "../../src/db";
import { eq, and } from "drizzle-orm";
import { carts, cartItems,products } from "../../src/db/schema";
import {
  CreateCartInput,
  UpdateCartInput,
  AddCartItemInput,
} from "./cart.validator";

export async function findAllCarts() {
  return db
    .select()
    .from(carts)
    .leftJoin(cartItems, eq(carts.id, cartItems.cartId));
}

export async function getCartById(id: number) {
  return db
    .select()
    .from(carts)
    .leftJoin(cartItems, eq(carts.id, cartItems.cartId))
    .where(eq(carts.id, id));
}

export async function createCarts(cart: CreateCartInput) {
  const existingCart = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, cart.userId));

  if (existingCart.length > 0) {
    return undefined;
  }

  const result = await db
    .insert(carts)
    .values({
      userId: cart.userId,
      total: "0",
    })
    .returning();

  return result[0];
}

export async function updateCarts(
  cartId: number,
  updatedCart: UpdateCartInput
) {
  const result = await db
    .update(carts)
    .set(updatedCart)
    .where(eq(carts.id, cartId))
    .returning();

  if (result.length === 0) return undefined;

  return result[0];
}

export async function deleteCarts(cartId: number) {
  const result = await db
    .delete(carts)
    .where(eq(carts.id, cartId))
    .returning();

  if (result.length === 0) return undefined;

  return result[0];
}

export async function addItemToCart(
  cartId: number,
  item: AddCartItemInput
) {
  const cart = await db
    .select()
    .from(carts)
    .where(eq(carts.id, cartId));

  if (cart.length === 0) return "cart_not_found";

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, item.productId));

  if (product.length === 0) return "product_not_found";

  const insertedItem = await db
    .insert(cartItems)
    .values({
      cartId,
      productId: item.productId,
      quantity: item.quantity,
      price: product[0].price,
    })
    .returning();

  const items = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));

  const total = calculateTotal(items);

  await db
    .update(carts)
    .set({
      total: total.toString(),
    })
    .where(eq(carts.id, cartId));

  return insertedItem[0];
}

export async function removeItemToCart(cartId: number, productId: number) {
  const result = await db
    .delete(cartItems)
    .where(
      and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId))
    )
    .returning();

  if (result.length === 0) return undefined;

  const items = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));

  const total = calculateTotal(items);

  await db
    .update(carts)
    .set({
      total: total.toString(),
    })
    .where(eq(carts.id, cartId));

  return result[0];
}

function calculateTotal(items: { price: string; quantity: number }[]) {
  return items.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);
}