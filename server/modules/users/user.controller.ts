import { Response, Request } from "express";
import * as userService from "./user.service";
import {
  createUserSchema,
  updateUserSchema,
} from "./user.validator";
export async function getUsers(req: Request, res: Response) {
  const username = req.query.username as string
  const email = req.query.email as string
  if (username || email) {
    const user = await userService.getUserByUsernameOrEmail(username, email);
  
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  
    return res.json(user);
  }
  const users = await userService.getUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const currentUserId = (req as any).userId;

  if (currentUserId !== id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  res.json(user);
}
export async function createUser(req: Request, res: Response) {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  const user = await userService.createUser(result.data);
  res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  const user = await userService.updateUser(id, result.data);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id )
  const user = await userService.deleteUser(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}