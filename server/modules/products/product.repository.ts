import { db } from "../../src/db";
import { NewProduct, products } from "../../src/db/schema";
import { eq,ilike } from "drizzle-orm";

export async function getProducts({
  limit,
  skip,
  search,
}: {
  limit: number;
  skip: number;
  search?: string;
}) {
  if (search) {
    return await db
      .select()
      .from(products)
      .where(
        ilike(products.title, `%${search}%`)
      )
      .limit(limit)
      .offset(skip);
  }
  
  return await db
    .select()
    .from(products)
    .limit(limit)
    .offset(skip);
}

export async function getProductById(id: number) {
  const result = await db.select().from(products).where(eq(products.id, id));

  return result[0];
}

export async function createProduct(data: NewProduct) {
  const [product] = await db
    .insert(products)
    .values(data)
    .returning();

  return product;
}