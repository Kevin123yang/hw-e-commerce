import type { LoginInput, User } from "../type";
const wait = async (time:number)=>{
  return new Promise((res)=> setTimeout(()=> res(null),time))
}
export async function loginApi(
    input: LoginInput
  ): Promise<User> {
    const { username, password } = input;
    if (
      username === "emilys" &&
      password === "emilyspass"
    ) {
      await wait(1000)
      return {
        id: 1,
        username: "emilys",
      };
    }
    await wait(1000)
    throw new Error("Invalid credentials");
  }

