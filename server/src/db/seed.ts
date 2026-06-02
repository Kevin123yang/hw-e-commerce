import { db } from "./index";
import { users, products, carts, cartItems } from "./schema";

async function seed() {
  await db.delete(cartItems);
  await db.delete(carts);
  await db.delete(products);
  await db.delete(users);

  const insertedUsers = await db
    .insert(users)
    .values([
      {
        username: "kevin",
        email: "kevin@gmail.com",
        password: "123456",
      },
    ])
    .returning();

  const insertedProducts = await db
    .insert(products)
    .values([
      {
        title: "Product 1",
        price: "10",
      },
      {
        title: "Product 2",
        price: "20",
      },
    ])
    .returning();

  const insertedCarts = await db
    .insert(carts)
    .values([
      {
        userId: insertedUsers[0].id,
        total: "20",
      },
    ])
    .returning();

  await db.insert(cartItems).values([
    {
      cartId: insertedCarts[0].id,
      productId: insertedProducts[0].id,
      quantity: 2,
      price: "10",
    },
  ]);

  console.log("Seed completed");
}

seed();