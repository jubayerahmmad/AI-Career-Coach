import { PrismaClient } from "@prisma/client";

/**
 * Exports a singleton instance of PrismaClient.
 *
 * This ensures that only one instance of PrismaClient is created and reused across the application,
 * especially useful in development environments with hot-reloading where multiple instances can cause issues.
 *
 * - If `globalThis.prisma` exists, it reuses the existing PrismaClient instance.
 * - Otherwise, it creates a new PrismaClient instance.
 *
 * Why use `globalThis`?
 * ---------------------
 * Using `globalThis` allows you to store the Prisma client instance in a global scope that persists across module reloads.
 * This is particularly important in development with hot-reloading (e.g., Next.js, Vite), where modules may be re-executed
 * but the global object remains the same. Without `globalThis`, multiple PrismaClient instances could be created,
 * leading to connection errors or resource leaks.
 *
 * @constant {PrismaClient} db - The PrismaClient instance used for database operations.
 */

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
