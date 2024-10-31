import { randomBytes, scryptSync } from "crypto";
import { createUser, findUser } from "../db/users.js";

export function registerEvents(socket, io) {
  socket.on("createUser", async (data) => {
    const searchingUser = await findUser({
      name: data["name"],
    });

    if (!searchingUser) {
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
    } else {
      io.emit("userExists", data["name"]);
    }
  });
}
