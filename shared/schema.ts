import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the existing users table for template compatibility.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Static web app: no database-backed resources required.
// Define a tiny shared type for the frontend to render.
export const siteConfigSchema = z.object({
  name: z.string(),
  tagline: z.string(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
