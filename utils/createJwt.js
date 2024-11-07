import jwt from "jsonwebtoken";

export function createJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function validateJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
