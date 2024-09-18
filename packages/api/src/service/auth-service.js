// import sessionService from "./session-service.js";
import crypto from "node:crypto";

import userService from "./user-service.js";

const toBase64 = (str) => {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const generateToken = (payload) => {
  const jwtHeader = toBase64(JSON.stringify({ alg: "HS256", typ: "JWT" }));

  const jwtPayload = toBase64(JSON.stringify(payload));

  const signature = crypto
    .createHmac("sha256", "VERY_SECRET_STRING")
    .update(`${jwtHeader}.${jwtPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${jwtHeader}.${jwtPayload}.${signature}`;
};

const validateToken = (token) => {
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

  const stringJwtPayload = Buffer.from(jwtPayload, "base64").toString("utf-8");
  const jwtPayloadObj = JSON.parse(stringJwtPayload);

  if (jwtPayloadObj.exp < Date.now()) {
    return null;
  }

  return jwtPayloadObj;
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

    const accessToken = generateToken({
      userId: user.id,
      exp: Date.now() + 1000 * 20,
    });

    const refreshToken = generateToken({
      userId: user.id,
      exp: Date.now() + 1000 * 60 * 60 * 24,
    });

    return { accessToken, refreshToken };
  },

  validateToken,

  refreshToken: (refreshToken) => {
    const validationResult = validateToken(refreshToken);

    if (!validationResult) {
      return null;
    }

    const accessToken = generateToken({
      userId: validationResult.userId,
      exp: Date.now() + 1000 * 20,
    });

    return accessToken;
  },
};
