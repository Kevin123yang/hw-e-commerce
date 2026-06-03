import { Router } from "express";
import * as authController from "./auth.controller";
import { requireAuth } from "./auth.middleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.get("/me", requireAuth, authController.getMe);

export default router;