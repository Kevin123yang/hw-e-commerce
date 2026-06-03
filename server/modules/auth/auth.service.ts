import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../users/user.service";

export async function signup(data: {
  username: string;
  email: string;
  password: string;
}) {
  return userService.createUser(data);
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const user = await userService.getUserByEmail(data.email);

  if (!user || !user.password) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

export async function logout() {
  return {
    message: "Logged out successfully",
  };
}

export async function getMe(userId: number) {
  return userService.getUserById(userId);
}
export async function refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as {
        userId: number;
        email: string;
      };
  
      const token = jwt.sign(
        {
          userId: payload.userId,
          email: payload.email,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
  
      return { token };
    } catch {
      throw new Error("Invalid or expired refresh token");
    }
  }