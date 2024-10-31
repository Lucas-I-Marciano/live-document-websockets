import { users } from "./connection.js";

export async function createUser(object) {
  const creatingUser = await users.insertOne(object);
  return creatingUser;
}
