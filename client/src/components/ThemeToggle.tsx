import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const effective = useMemo(() => {
    if (!mounted) return "light";
    return resolvedTheme ?? theme ?? "light";
  }, [mounted, resolvedTheme, theme]);

  const isDark = effective === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative h-10 w-10 rounded-xl border-border/70 bg-card/60 p-0 shadow-paper-sm backdrop-blur transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-paper",
        "focus-visible:ring-4 focus-visible:ring-primary/15",
        className,
      )}
      data-testid="theme-toggle"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun
        className={cn(
          "absolute left-1/2 top-1/2 h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute left-1/2 top-1/2 h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-primary/10 via-transparent to-accent/10 group-hover:opacity-100",
        )}
      />
    </Button>
  );
}
