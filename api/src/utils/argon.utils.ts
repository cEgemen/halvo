import argon2 from "argon2";

const hashPassword = (password: string) =>
  argon2.hash(password, { type: argon2.argon2id });

const verifyPassword = (hash: string, password: string) =>
  argon2.verify(hash, password);

export { hashPassword, verifyPassword };
