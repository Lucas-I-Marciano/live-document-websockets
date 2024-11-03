import { randomBytes, scryptSync } from "crypto";

export function createPassHash(password, salt = null) {
  const saltHash = salt == null ? randomBytes(16).toString("hex") : salt;
  const hash = scryptSync(password, saltHash, 64).toString("hex");
  return [saltHash, hash];
}
