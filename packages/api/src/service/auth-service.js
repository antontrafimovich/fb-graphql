// import sessionService from "./session-service.js";
import userService from "./user-service.js";
import crypto from "node:crypto";

const toBase64 = (str) => {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default {
  login: async (db, { email, password }) => {
    const user = await userService.getUserByEmail(db, email);
    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    const jwtHeader = toBase64(JSON.stringify({ alg: "HS256", typ: "JWT" }));

    const jwtPayload = toBase64(JSON.stringify({ userId: user.id }));

    const signature = crypto
      .createHmac("sha256", "VERY_SECRET_STRING")
      .update(`${jwtHeader}.${jwtPayload}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return `${jwtHeader}.${jwtPayload}.${signature}`;
  },

  validateToken: (token) => {
    if (!token) {
      return null;
    }

    const [jwtHeader, jwtPayload, signature] = token.split(".");

    const incomingDataSignature = crypto
      .createHmac("sha256", "VERY_SECRET_STRING")
      .update(`${jwtHeader}.${jwtPayload}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (signature !== incomingDataSignature) {
      return null;
    }

    const stringJwtPayload = Buffer.from(jwtPayload, "base64").toString(
      "utf-8"
    );
    return JSON.parse(stringJwtPayload);
  },
};
