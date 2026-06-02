import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { carts, cartItems } from "../../src/db/schema";

const insertCartSchema = createInsertSchema(carts, {
  userId: (schema) =>
    schema.refine(
      (value) => value > 0,
      "User ID must be greater than 0"
    ),
});

const insertCartItemSchema = createInsertSchema(cartItems, {
  quantity: (schema) =>
    schema.refine(
      (value) => value > 0,
      "Quantity must be greater than 0"
    ),

  price: (schema) =>
    schema.refine(
      (value) => Number(value) > 0,
      "Price must be greater than 0"
    ),
});

export const createCartSchema = insertCartSchema.pick({
  userId: true,
});

export const updateCartSchema = createCartSchema.partial();

export const addCartItemSchema = insertCartItemSchema.pick({
  productId: true,
  quantity: true,
});

export const updateCartItemSchema = addCartItemSchema.partial();

export type CreateCartInput = z.infer<typeof createCartSchema>;
export type UpdateCartInput = z.infer<typeof updateCartSchema>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;