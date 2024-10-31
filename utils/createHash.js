import { randomBytes, scryptSync } from "crypto";

export function createPassHash(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return [salt, hash];
}
