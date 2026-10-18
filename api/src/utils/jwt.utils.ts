import { SignJWT, jwtVerify } from "jose";
import type { JWTPayload } from "jose";
import { randomUUID } from "node:crypto";

const getEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
};

const accessSecret = new TextEncoder().encode(getEnv("ACCESS_TOKEN_SECRET"));
const refreshSecret = new TextEncoder().encode(getEnv("REFRESH_TOKEN_SECRET"));
const accessExpiresIn = getEnv("ACCESS_TOKEN_EXPIRES_IN");
const refreshExpiresIn = getEnv("REFRESH_TOKEN_EXPIRES_IN");

const signToken = (
  userId: string | number,
  secret: Uint8Array,
  expiresIn: string,
) =>
  new SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

const verifyToken = async (token: string, secret: Uint8Array) => {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  return payload as JWTPayload & { sub: string; jti: string; exp: number };
};

const signAccessToken = (userId: string | number) =>
  signToken(userId, accessSecret, accessExpiresIn);

const signRefreshToken = (userId: string | number) =>
  signToken(userId, refreshSecret, refreshExpiresIn);

const verifyAccessToken = (token: string) => verifyToken(token, accessSecret);

const verifyRefreshToken = (token: string) =>
  verifyToken(token, refreshSecret);

export {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
