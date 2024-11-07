import { findUser } from "../server/db/users.js";
import { timingSafeEqual } from "crypto";
import { createPassHash } from "./createHash.js";

export async function authenticateUser(name, password) {
  const user = await findUser({ name });
  if (user) {
    const dbHash = user["hash"];
    const dbSalt = user["salt"];
    const providedHash = createPassHash(password, dbSalt)[1];
    return timingSafeEqual(
      Buffer.from(dbHash, "hex"),
      Buffer.from(providedHash, "hex")
    );
  }
  return false;
}
