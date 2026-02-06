import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useSiteConfig() {
  return useQuery({
    queryKey: [api.site.config.path],
    queryFn: async () => {
      const res = await fetch(api.site.config.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch site config");
      const json = await res.json();
      return parseWithLogging(api.site.config.responses[200], json, "site.config");
    },
  });
}
