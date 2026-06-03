import {
    getCarts,
    getCartsById,
    createCarts,
    updateCarts,
    deleteCarts,
    removeItemToCart,
    addItemToCart,
  } from "./cart.controller";
  
  import { Router } from "express";
  import { requireAuth } from "../auth/auth.middleware";
  
  const router = Router();
  
  router.get("/", requireAuth, getCarts);
  
  router.get("/:id", requireAuth, getCartsById);
  
  router.post("/", requireAuth, createCarts);
  
  router.put("/:id", requireAuth, updateCarts);
  
  router.delete("/:id", requireAuth, deleteCarts);
  
  router.post("/:id/items", requireAuth, addItemToCart);
  
  router.delete(
    "/:id/items/:productId",
    requireAuth,
    removeItemToCart
  );
  
  export default router;