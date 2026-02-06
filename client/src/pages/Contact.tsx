import { useMemo, useState } from "react";
import Seo from "@/components/Seo";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

function isEmailLike(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Contact() {
  const [state, setState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const validation = useMemo(() => {
    const nameOk = state.name.trim().length >= 2;
    const emailOk = isEmailLike(state.email);
    const msgOk = state.message.trim().length >= 10;
    return {
      nameOk,
      emailOk,
      msgOk,
      allOk: nameOk && emailOk && msgOk,
    };
  }, [state]);

  async function onSubmit() {
    if (!validation.allOk) {
      toast({
        title: "Check the form",
        description: "Please provide a name, a valid email, and a message (10+ characters).",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const emailjs = (window as any).emailjs;
      await emailjs.send("service_srfgy0f", "template_z4eqm1d", {
        from_name: state.name,
        from_email: state.email,
        message: state.message,
      });
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setState({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <AppShell>
      <Seo
        title="Contact — Studio"
        description="A polished contact page with validation, micro-interactions, and a minimal premium aesthetic."
        canonicalPath="/contact"
      />

      <section className="mx-auto w-full max-w-5xl pt-2 md:pt-6" data-testid="contact-page">
        <header className="anim-fade-up">
          <h1 className="text-balance text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl" data-testid="contact-title">
            Let’s make something <span className="text-primary">quietly iconic</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base" data-testid="contact-subtitle">
            Send a message. This UI is fully interactive; the actual send action can be wired to your backend when ready.
          </p>
        </header>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Card
            className={cn(
              "anim-fade-up-2 rounded-3xl border-border/60 bg-card/60 p-6 shadow-paper backdrop-blur",
            )}
            data-testid="contact-form-card"
          >
            <div className="flex items-center gap-2 text-sm font-semibold" data-testid="contact-form-header">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-primary/12 via-card/50 to-accent/10 shadow-paper-sm">
                <Mail className="h-4.5 w-4.5 text-primary" />
              </span>
              Contact form
            </div>

            <div className="mt-5 grid gap-4">
              <div className="grid gap-2" data-testid="field-name">
                <label className="text-xs font-semibold text-foreground/80" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  value={state.name}
                  onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Ada Lovelace"
                  className={cn(
                    "h-11 rounded-2xl border-2 bg-background/40 shadow-paper-sm transition-all duration-300",
                    "focus:border-primary focus:ring-4 focus:ring-primary/10",
                  )}
                  data-testid="contact-name"
                />
                <p className="text-xs text-muted-foreground" data-testid="contact-name-hint">
                  {validation.nameOk ? "Looks good." : "Add at least 2 characters."}
                </p>
              </div>

              <div className="grid gap-2" data-testid="field-email">
                <label className="text-xs font-semibold text-foreground/80" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  value={state.email}
                  onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                  placeholder="ada@domain.com"
                  className={cn(
                    "h-11 rounded-2xl border-2 bg-background/40 shadow-paper-sm transition-all duration-300",
                    "focus:border-primary focus:ring-4 focus:ring-primary/10",
                  )}
                  data-testid="contact-email"
                />
                <p className="text-xs text-muted-foreground" data-testid="contact-email-hint">
                  {validation.emailOk ? "Valid email format." : "Use a real email (e.g., name@domain.com)."}
                </p>
              </div>

              <div className="grid gap-2" data-testid="field-message">
                <label className="text-xs font-semibold text-foreground/80" htmlFor="message">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={state.message}
                  onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
                  placeholder="Tell us what you're building, what 'done' looks like, and your timeline…"
                  className={cn(
                    "min-h-32 rounded-2xl border-2 bg-background/40 shadow-paper-sm transition-all duration-300",
                    "focus:border-primary focus:ring-4 focus:ring-primary/10",
                  )}
                  data-testid="contact-message"
                />
                <p className="text-xs text-muted-foreground" data-testid="contact-message-hint">
                  {validation.msgOk ? "Great—clear enough to act on." : "Add at least 10 characters."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground" data-testid="contact-privacy">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  No tracking. No spam. (Demo UI)
                </div>

                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSending}
                  className={cn(
                    "group h-11 rounded-2xl px-5 font-semibold shadow-paper-sm transition-all duration-300",
                    "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                    "hover:-translate-y-0.5 hover:shadow-paper active:translate-y-0",
                    "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none",
                  )}
                  data-testid="contact-submit"
                >
                  {isSending ? "Sending…" : "Send message"}
                  <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            <Card
              className="anim-fade-up-3 rounded-3xl border-border/60 bg-card/60 p-6 shadow-paper-sm backdrop-blur"
              data-testid="contact-side-card"
            >
              <h2 className="text-lg font-bold tracking-tight" data-testid="contact-side-title">
                Prefer direct contact?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="contact-side-body">
                Add your real email/social links here. This block is intentionally minimal—only what’s needed.
              </p>

              <div className="mt-4 rounded-2xl border border-border/60 bg-background/40 p-4 shadow-paper-sm">
                <div className="text-xs font-semibold text-foreground/80" data-testid="contact-direct-label">
                  Email
                </div>
                <div className="mt-1 text-sm text-foreground" data-testid="contact-direct-email">
                  hello@example.com
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border/60 bg-background/40 p-4 shadow-paper-sm">
                <div className="text-xs font-semibold text-foreground/80" data-testid="contact-direct-label-2">
                  Response time
                </div>
                <div className="mt-1 text-sm text-foreground" data-testid="contact-direct-time">
                  Usually within 1–2 business days
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
