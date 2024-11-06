import { validateJwt } from "../../utils/createJwt.js";

export function validateUser(socket, next) {
  try {
    validateJwt(socket.handshake.query["token"]);
    next();
  } catch (error) {
    next(error);
  }
}
