import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { products } from "../../src/db/schema";

const insertProductSchema = createInsertSchema(products, {
  title: (schema) =>
    schema.min(1, "Title is required"),

  price: (schema) =>
    schema.refine(
      (value) => Number(value) > 0,
      "Price must be greater than 0"
    ),
});

export const createProductSchema = insertProductSchema.pick({
  title: true,
  price: true,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;