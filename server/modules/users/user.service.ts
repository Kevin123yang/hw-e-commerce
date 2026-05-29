import { User } from "./user.types";

const users: User[] = [
  {
    id: "1",
    username: "kevin",
    email: "kevin@gmail.com",
    password: "123456",
  },
];

export function getUsers() {
  return users.map(removePassword);
}

export function getUserById(id: string) {
  const user = users.find((user) => user.id === id);
  if (!user) return undefined
  return removePassword(user);
}

export function createUser(newUser: User) {
  users.push(newUser);
  return removePassword(newUser);;
}

export function updateUser(id: string, data: Partial<User>) {
  const user = users.find((user) => user.id === id);
  if (!user) return undefined;

  Object.assign(user, data);
  return removePassword(user);
}

export function deleteUser(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  const deletedUser = users.splice(index, 1)[0];
  return removePassword(deletedUser);
}
function removePassword(user: User) {
  const { password, ...safeUser } = user;
  return safeUser;
}
export function getUserByUsernameOrEmail(username?: string, email?: string) {
  const user = users.find(
    user => user.username === username || user.email === email
  );

  if (!user) return undefined;

  return removePassword(user);
}