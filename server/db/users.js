import { users } from "./connection.js";

export function createUser(object) {
  return users.insertOne(object);
}

export function findUser(object) {
  return users.findOne(object);
}
