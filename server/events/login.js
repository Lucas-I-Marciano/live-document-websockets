import { authenticateUser } from "../../utils/authenticateUser.js";
import { createJwt } from "../../utils/createJwt.js";

export function loginEvents(socket, io) {
  socket.on("authenticateUser", async ({ name, password }) => {
    const isAuthenticated = await authenticateUser(name, password);
    if (isAuthenticated) {
      socket.emit("userAuthenticated", createJwt({ username: name }));
    }
  });
}
