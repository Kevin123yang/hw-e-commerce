import { Response, Request } from "express";
import * as userService from "./user.service";

export function getUsers(req: Request, res: Response) {
  const username = req.query.username as string
  const email = req.query.email as string
  if(username || email) {
    const user = userService.getUserByUsernameOrEmail(username, email)
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  }
  const users = userService.getUsers();
  res.json(users);
}

export function getUserById(req: Request, res: Response) {
  const id = req.params.id as string;
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
}
export function createUser(req: Request, res: Response) {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
}

export function updateUser(req: Request, res: Response) {
  const id = req.params.id as string
  const user = userService.updateUser(id, req.body);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

export function deleteUser(req: Request, res: Response) {
  const id = req.params.id as string
  const user = userService.deleteUser(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}