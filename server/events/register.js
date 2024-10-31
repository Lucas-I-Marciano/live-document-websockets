import { randomBytes, scryptSync } from "crypto";

export function registerEvents(socket, io) {
  socket.on("createUser", (data) => {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(data["password"], salt, 64).toString("hex");
  });
}
