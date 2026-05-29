import { Router } from "express";
import { getProducts, getProductById } from "./product.controller";
const router = Router()

router.get("/",getProducts)
router.get("/:id",getProductById)
// router.post("/")
export default router;