/**
 * Seed Admin - Create or reset single admin user (password only on backend)
 * Password is hashed with PBKDF2. Set ADMIN_SECRET in .env when running seed (never commit .env).
 */

import crypto from "crypto";
import { AdminModel } from "../models/Admin";

const PBKDF2_ITERATIONS = 100000;
const KEY_LEN = 64;
const SALT_LEN = 32;

function hashPassword(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LEN, "sha512")
    .toString("hex");
}

export async function seedAdmin(): Promise<void> {
  const rawPassword =
    process.env.ADMIN_SECRET || process.env.ADMIN_SEED_PASSWORD || "admin";

  if (!process.env.ADMIN_SECRET && !process.env.ADMIN_SEED_PASSWORD) {
    console.warn(
      "⚠️  ADMIN_SECRET not set; using default 'admin'. Set ADMIN_SECRET in .env for production (file is gitignored).",
    );
  }

  const salt = crypto.randomBytes(SALT_LEN).toString("hex");
  const passwordHash = hashPassword(rawPassword, salt);

  await AdminModel.deleteMany({});
  await AdminModel.create({
    passwordHash,
    salt,
    token: null,
  });

  console.log(
    "✅ Admin seeded (password stored only on backend, hashed in DB)",
  );
}

export function verifyAdminPassword(
  password: string,
  salt: string,
  storedHash: string,
): boolean {
  const hash = hashPassword(password, salt);
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
