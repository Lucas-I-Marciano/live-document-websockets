import { validateJwt } from "../../utils/createJwt.js";

export function validateUser(socket, next) {
  try {
    const decoded = validateJwt(socket.handshake.query["token"]);
    if (decoded) {
      next();
    } else {
      next(new Error());
    }
  } catch (error) {
    console.error(error.message);
  }
}
