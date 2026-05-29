import { Product } from "./type";
const products: Product[] = [
  {
    id: "1",
    title: "iPhone",
    price: 999,
  },
  {
    id: "2",
    title: "MacBook",
    price: 1999,
  },
];
export function getProducts() {
  return products;
}
// export function createProduct(req:Request, res:Response){
//   res.json({

//   })
// }
export function getProductById( id:string) {
  
  const product = products.find((product) => product.id === id);
  return product;
}
