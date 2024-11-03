import { authenticateUser } from "../../utils/authenticateUser.js";

export function loginEvents(socket, io) {
  socket.on("authenticateUser", async ({ name, password }) => {
    const isAuthenticated = await authenticateUser(name, password);
    if (isAuthenticated) {
      socket.emit("userAuthenticated", name);
    }
  });
}
