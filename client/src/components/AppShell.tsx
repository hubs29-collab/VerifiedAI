import { ReactNode, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { PanelLeft, Sparkles } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useSiteConfig } from "@/hooks/use-site";

type NavItem = { href: string; label: string; testid: string };

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
        active
          ? "bg-primary text-primary-foreground shadow-paper-sm"
          : "text-foreground/80 hover:bg-muted hover:text-foreground",
      )}
      data-testid={`nav-link-${label.toLowerCase()}`}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-lg border",
            active
              ? "border-primary-foreground/20 bg-primary-foreground/10"
              : "border-border/70 bg-card/60 group-hover:bg-card",
          )}
          aria-hidden="true"
        >
          <Sparkles className={cn("h-3.5 w-3.5", active ? "text-primary-foreground" : "text-primary")} />
        </span>
        {label}
      </span>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-opacity",
          active ? "bg-primary-foreground/80 opacity-100" : "bg-foreground/30 opacity-0 group-hover:opacity-100",
        )}
        aria-hidden="true"
      />
    </Link>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { data: config } = useSiteConfig();

  const nav: NavItem[] = useMemo(
    () => [
      { href: "/", label: "Home", testid: "nav-home" },
      { href: "/about", label: "About", testid: "nav-about" },
      { href: "/contact", label: "Contact", testid: "nav-contact" },
    ],
    [],
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-dvh w-full app-surface" data-testid="app-shell">
        <div className="mx-auto flex min-h-dvh w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Sidebar */}
          <aside
            className={cn(
              "hidden w-[280px] shrink-0 py-6 md:block",
            )}
            data-testid="sidebar"
          >
            <div className="glass shadow-paper-sm rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
                  data-testid="brand-link"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/18 via-primary/10 to-accent/18 border border-border/60 shadow-paper-sm">
                    <PanelLeft className="h-4.5 w-4.5 text-primary" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-base font-bold tracking-tight">
                      {config?.name ?? "Studio"}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {config?.tagline ?? "A clean minimal static site"}
                    </span>
                  </span>
                </Link>

                <ThemeToggle />
              </div>

              <div className="mt-4 h-px w-full bg-border/70" role="separator" />

              <nav className="mt-4 grid gap-1.5" data-testid="sidebar-nav">
                {nav.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={location === item.href}
                  />
                ))}
              </nav>

              <div className="mt-4 rounded-xl border border-border/60 bg-card/50 p-3">
                <p className="text-xs text-muted-foreground" data-testid="sidebar-hint">
                  Tip: Use the theme toggle for a calm dark mode—same layout, different mood.
                </p>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col py-4 md:py-6">
            {/* Topbar (mobile) */}
            <header
              className="md:hidden"
              data-testid="mobile-topbar"
            >
              <div className="glass shadow-paper-sm rounded-2xl px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href="/"
                      className="block truncate text-sm font-semibold"
                      data-testid="mobile-brand"
                    >
                      {config?.name ?? "Studio"}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground" data-testid="mobile-tagline">
                      {config?.tagline ?? "A clean minimal static site"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2" data-testid="mobile-nav">
                  {nav.map((item) => {
                    const active = location === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-xl px-3 py-2 text-center text-xs font-semibold transition-all duration-300",
                          active
                            ? "bg-primary text-primary-foreground shadow-paper-sm"
                            : "bg-card/60 text-foreground/80 hover:bg-muted",
                        )}
                        data-testid={item.testid}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </header>

            <SidebarInset className="mt-4 md:mt-0">
              <main className="min-w-0 flex-1" data-testid="page-content">
                {children}
              </main>

              <footer
                className="mt-10 pb-8 pt-6 text-center text-xs text-muted-foreground"
                data-testid="footer"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 shadow-paper-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Built as a static demo UI — your backend can keep it tiny.
                </span>
              </footer>
            </SidebarInset>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
