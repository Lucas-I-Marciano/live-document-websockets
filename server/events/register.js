import { createUser, findUser } from "../db/users.js";
import { createPassHash } from "../../utils/createHash.js";

export function registerEvents(socket, io) {
  socket.on("createUser", async (data) => {
    const searchingUser = await findUser({
      name: data["name"],
    });

    if (!searchingUser) {
      const [salt, hash] = createPassHash(data["password"]);
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
