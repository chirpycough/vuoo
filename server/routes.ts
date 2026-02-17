import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // No server-side API routes needed since we use Firebase on the client
  return httpServer;
}
