import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

const userOrIp = (req) => req.user?.id || req.ip;

export const globalLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: userOrIp,
  validate: { keyGeneratorIpFallback: false },
});

export const aiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.aiMax,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: userOrIp,
  message: { success: false, message: "AI rate limit exceeded" },
  validate: { keyGeneratorIpFallback: false },
});

export const authLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `${req.ip}:${req.body?.email || ""}`,
  validate: { keyGeneratorIpFallback: false },
});
