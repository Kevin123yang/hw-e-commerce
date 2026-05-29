// cart.types.ts

export interface CartItem {
    productId: number;
    quantity: number;
    price:number
  }
  
  export interface Cart {
    id: string;
    userId: number;
    products: CartItem[];
    total: number;
  }