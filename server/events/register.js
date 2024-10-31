import { randomBytes, scryptSync } from "crypto";
import { createUser } from "../db/users.js";

export function registerEvents(socket, io) {
  socket.on("createUser", async (data) => {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(data["password"], salt, 64).toString("hex");
    const creatingUser = await createUser({
      name: data["name"],
      salt,
      hash,
    });
    if (creatingUser["acknowledged"]) {
      io.emit("userCreated", data["name"]);
    }
  });
}
