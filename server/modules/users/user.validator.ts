import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../../src/db/schema";

export const insertUserSchema = createInsertSchema(users, {
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createUserSchema = insertUserSchema.pick({
  username: true,
  email: true,
  password: true,
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;