import { validateJwt } from "../../utils/createJwt.js";

export function validateUser(socket, next) {
  try {
    const payload = validateJwt(socket.handshake.query["token"]);
    socket.emit("sendingPayload", payload);
    next();
  } catch (error) {
    next(error);
  }
}
