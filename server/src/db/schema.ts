import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  price: numeric("price").notNull(),
});

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  total: numeric("total").notNull(),
  
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .references(() => carts.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull(),
});


export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export type Cart = InferSelectModel<typeof carts>;
export type NewCart = InferInsertModel<typeof carts>;

export type CartItem = InferSelectModel<typeof cartItems>;
export type NewCartItem = InferInsertModel<typeof cartItems>;