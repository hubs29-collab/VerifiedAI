import { z } from "zod";
import { siteConfigSchema } from "./schema";

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  site: {
    config: {
      method: "GET" as const,
      path: "/api/site-config",
      responses: {
        200: siteConfigSchema,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, String(value));
    }
  }
  return url;
}

export type SiteConfigResponse = z.infer<typeof api.site.config.responses[200]>;
