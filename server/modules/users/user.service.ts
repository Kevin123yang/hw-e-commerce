import * as userRepository from "./user.repository";
import bcrypt from "bcrypt";
import {
  CreateUserInput,
  UpdateUserInput,
} from "./user.validator";

export async function getUsers() {
  return userRepository.getUsers();
}

export async function getUserById(id: number) {
  return userRepository.getUserById(id);
}

export async function createUser(newUser: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  return userRepository.createUser({...newUser, password: hashedPassword});
}

export async function updateUser(id: number, data: UpdateUserInput) {
  
  return userRepository.updateUser(id, data);
}

export async function deleteUser(id: number) {
  return userRepository.deleteUser(id);
}

export async function getUserByUsernameOrEmail(
  username?: string,
  email?: string
) {
  return userRepository.getUserByUsernameOrEmail(username, email);
}

export async function getUserByEmail(email: string) {
  return userRepository.getUserByEmail(email);
}