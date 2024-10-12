/**
 * Provides a singleton instance of the Prisma client for interacting with the database.
 * 
 * The `db` export is a global instance of the Prisma client that can be used throughout the application.
 * If the `prisma` global variable is not defined, a new Prisma client instance is created and assigned to it.
 * In non-production environments, the `prisma` global variable is set to the `db` instance for easy access.
 */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

                                  