import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller";

import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.get("/", requireAuth, getUsers);

router.get("/:id", requireAuth, getUserById);

router.post("/", createUser);

router.put("/:id", requireAuth, updateUser);

router.delete("/:id", requireAuth, deleteUser);


export default router;