import { Request, Response } from "express";
import * as authService from "./auth.service";
import { signupSchema, loginSchema,refreshSchema } from "./auth.validator";
import { AuthRequest } from "./auth.middleware";

export async function signup(req: Request, res: Response) {
  const data = signupSchema.parse(req.body);
  const user = await authService.signup(data);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const result = await authService.login(data);
  res.json(result);
}

export async function logout(req: Request, res: Response) {
  const result = await authService.logout();
  res.json(result);
}

export async function getMe(req: AuthRequest, res: Response) {
  const user = await authService.getMe(req.userId!);
  res.json(user);
}
export async function refresh(req: Request, res: Response) {
  const result = refreshSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues,
    });
  }

  try {
    const data = await authService.refresh(result.data.refreshToken);

    res.json(data);
  } catch (err: any) {
    res.status(401).json({
      message: err.message,
    });
  }
}