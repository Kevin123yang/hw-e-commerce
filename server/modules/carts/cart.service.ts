import { Cart, CartItem } from "./cart.types";
const carts: Cart[] = [
  {
    id: "1",
    userId: 1,
    products: [
      {
        productId: 101,
        quantity: 2,
        price: 1000,
      },
      {
        productId: 102,
        quantity: 1,
        price: 500,
      },
    ],
    total: 2500,
  },
  {
    id: "2",
    userId: 2,
    products: [
      {
        productId: 103,
        quantity: 1,
        price: 1000,
      },
      {
        productId: 104,
        quantity: 1,
        price: 500,
      },
    ],
    total: 1500,
  },
];

export function getCarts() {
  return carts;
}

export function getCartsById(id: string) {
  const cart = carts.find((cart) => cart.id === id);
  return cart;
}

export function createCarts(cart: Cart) {
  const existingCart = carts.find(
    (c) => c.userId === cart.userId
  );
  
  if (existingCart) {
    return undefined;
  }
  cart.total = calculateTotal(cart.products);

  carts.push(cart);
  return cart;
}
export function updateCarts(cartId: string, updatedCart: Cart) {
  const index = carts.findIndex((cart) => cart.id === cartId);
  if (index === -1) return undefined;
  carts[index] = updatedCart;
  return updatedCart;
}
export function deleteCarts(cartId: string) {
  const index = carts.findIndex((cart) => cart.id === cartId);
  if (index === -1) return undefined;
  const deleteCart = carts.splice(index, 1)[0];
  return deleteCart;
}

export function addItemToCart(
  cartId: string,
  item: CartItem
) {
  const cart = carts.find(cart => cart.id === cartId)
  if(!cart) return undefined
  cart.products.push(item)
  cart.total = calculateTotal(cart.products);

  return cart
}
export function removeItemToCart(
  cartId: string,
  productId: number
) {
  const cart = carts.find(cart => cart.id === cartId)
  if(!cart) return undefined
  const index = cart.products.findIndex((product) => product.productId === productId );
  if (index === -1) return undefined;
  const deleteProduct = cart.products.splice(index, 1)[0];
  cart.total = calculateTotal(cart.products);
  return deleteProduct
}

function calculateTotal(products: CartItem[]) {
  return products.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}