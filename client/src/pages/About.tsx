import Seo from "@/components/Seo";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Feather, Layers, Shield } from "lucide-react";

function Principle({
  icon,
  title,
  body,
  testid,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  testid: string;
}) {
  return (
    <Card
      className="rounded-2xl border-border/60 bg-card/60 p-5 shadow-paper-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-paper"
      data-testid={testid}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-primary/12 via-card/50 to-accent/10 shadow-paper-sm">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold tracking-tight">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </Card>
  );
}

export default function About() {
  return (
    <AppShell>
      <Seo
        title="About — Studio"
        description="A minimal, premium static site starter: clear typography, cohesive palette, responsive layout, and polished interactions."
        canonicalPath="/about"
        og={{ type: "article" }}
      />

      <section className="mx-auto w-full max-w-5xl pt-2 md:pt-6" data-testid="about-page">
        <header className="anim-fade-up">
          <h1 className="text-balance text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl" data-testid="about-title">
            Design that stays out of your way <span className="text-primary">—</span> but never feels generic.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base" data-testid="about-subtitle">
            This template is built for “clean minimal” with premium texture: soft glass surfaces, tuned shadows, crisp
            typography, and micro-interactions that make the interface feel alive.
          </p>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Principle
            icon={<Feather className="h-5 w-5 text-primary" />}
            title="Typography first"
            body="Display serif for headlines, Plex Sans for everything else—clear hierarchy, zero noise."
            testid="about-principle-typography"
          />
          <Principle
            icon={<Layers className="h-5 w-5 text-primary" />}
            title="Depth, not clutter"
            body="A small set of surfaces (card / muted / glass) creates a calm, coherent UI."
            testid="about-principle-depth"
          />
          <Principle
            icon={<Shield className="h-5 w-5 text-primary" />}
            title="Stable foundation"
            body="TanStack Query for fetching, wouter for routing, next-themes for light/dark. Simple, reliable."
            testid="about-principle-foundation"
          />
        </div>

        <div className="mt-10 anim-fade-up-2">
          <Card className="rounded-3xl border-border/60 bg-card/60 p-6 shadow-paper backdrop-blur" data-testid="about-details-card">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold tracking-tight md:text-2xl" data-testid="about-details-title">
                  What you get
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="about-details-body">
                  Three pages (Home, About, Contact), a responsive sidebar layout, theme toggle, and per-page SEO tags.
                  Every meaningful element includes <code className="rounded bg-muted px-1 py-0.5 text-xs">data-testid</code>{" "}
                  for confident testing.
                </p>
              </div>

              <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background/40 p-4">
                <h3 className="text-sm font-bold tracking-tight" data-testid="about-checklist-title">
                  Checklist
                </h3>
                <Separator className="my-3" />
                <ul className="grid gap-2 text-sm text-muted-foreground" data-testid="about-checklist">
                  {[
                    "Light/Dark mode with system preference",
                    "Config fetched from /api/site-config",
                    "Responsive layout (mobile topbar + sidebar)",
                    "Premium shadows, gradients, and animations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
