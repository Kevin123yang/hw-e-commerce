import type { LoginInput, User } from "../type";

export async function loginApi(
    input: LoginInput
  ): Promise<User> {
    const { username, password } = input;
  
    if (
      username === "emilys" &&
      password === "emilyspass"
    ) {
      return {
        id: 1,
        username: "emilys",
      };
    }
  
    throw new Error("Invalid credentials");
  }

