import { getCarts, getCartsById,createCarts,updateCarts,deleteCarts ,removeItemToCart, addItemToCart} from "./cart.controller";
import { Router } from "express";
const router = Router();

router.get("/", getCarts);
router.get("/:id", getCartsById);
router.post("/", createCarts);
router.put("/:id", updateCarts);
router.delete("/:id", deleteCarts);
router.post("/:id/items", addItemToCart);
router.delete("/:id/items/:productId", removeItemToCart);
export default router