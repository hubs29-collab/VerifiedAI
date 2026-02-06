import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(api.site.config.path, (_req, res) => {
    res.json({
      name: "VerifiedAI",
      tagline: "Trusted AI solutions for everyone.",
    });
  });

  return httpServer;
}
