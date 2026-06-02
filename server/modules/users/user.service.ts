import * as userRepository from "./user.repository";
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
  return userRepository.createUser(newUser);
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