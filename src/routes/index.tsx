import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, MessageSquare, CalendarCheck } from "lucide-react";
import { Shell, PersonaBar } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Experience2Evidence — Your experience. Translated into opportunity." },
    { name: "description", content: "Help skilled refugees turn professional experience into strong profiles, networking messages and a 7-day action plan." },
    { property: "og:title", content: "Experience2Evidence" },
    { property: "og:description", content: "Your experience. Translated into opportunity." },
  ] }),
  component: Home,
});

const tools = [
  { to: "/translator", icon: FileText, t: "Experience Translator", d: "Turn past roles into a professional summary, competencies and achievement bullets." },
  { to: "/networking", icon: MessageSquare, t: "Networking Builder", d: "Write culturally appropriate outreach to mentors, recruiters and peers." },
  { to: "/plan", icon: CalendarCheck, t: "My 7-Day Plan", d: "Follow a practical, trackable week of steps toward local opportunity." },
] as const;

function Home() {
  return (
    <Shell>
      <section className="py-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Your experience. Translated into opportunity.</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">Your experience is valuable. Let's make it visible.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Turn your professional experience into stronger profiles, meaningful connections and practical pathways to work.</p>
        <Link to="/translator" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Start Building My Career Path <ArrowRight className="h-4 w-4" /></Link>
      </section>
      <PersonaBar />
      <div className="grid gap-4 md:grid-cols-3">
        {tools.map(({ to, icon: I, t, d }) => (
          <Link key={to} to={to} className="rounded-xl border p-6 transition hover:border-primary hover:shadow-md">
            <I className="mb-3 h-7 w-7 text-primary" /><h2 className="font-semibold">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">No sign-up. Everything you enter is saved privately in this browser and shared across all three tools.</p>
    </Shell>
  );
}
