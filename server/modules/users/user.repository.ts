import { db } from "../../src/db";
import { users, User } from "../../src/db/schema";
import { eq, or } from "drizzle-orm";
import { CreateUserInput, UpdateUserInput } from "./user.validator";
function removePassword(user: User) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function getUsers() {
  const result = await db.select().from(users);
  return result.map(removePassword);
}

export async function getUserById(id: number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id));

  if (result.length === 0) return undefined;

  return removePassword(result[0]);
}

export async function createUser(newUser: CreateUserInput) {
  const result = await db
    .insert(users)
    .values({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    })
    .returning();

  return removePassword(result[0]);
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  if (result.length === 0) return undefined;

  return removePassword(result[0]);
}

export async function deleteUser(id: number) {
  const result = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  if (result.length === 0) return undefined;

  return removePassword(result[0]);
}

export async function getUserByUsernameOrEmail(
  username?: string,
  email?: string
) {
  const result = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.username, username ?? ""),
        eq(users.email, email ?? "")
      )
    );

  if (result.length === 0) return undefined;

  return removePassword(result[0]);
}