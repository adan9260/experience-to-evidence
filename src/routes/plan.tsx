import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Shell, PersonaBar } from "@/components/Shell";
import { useProfile, useLocal, plan } from "@/lib/profile";

export const Route = createFileRoute("/plan")({
  head: () => ({ meta: [
    { title: "My 7-Day Opportunity Plan — Experience2Evidence" },
    { name: "description", content: "A practical 7-day checklist to build local visibility, networks and evidence of your skills." },
    { property: "og:title", content: "My 7-Day Opportunity Plan — Experience2Evidence" },
    { property: "og:description", content: "Track a week of steps toward meaningful work." },
  ] }),
  component: Plan,
});

function Plan() {
  const [p] = useProfile();
  const [done, setDone] = useLocal<boolean[]>("e2e-plan", Array(7).fill(false));
  const n = done.filter(Boolean).length, pct = Math.round((n / 7) * 100);
  return (
    <Shell>
      <h1 className="text-3xl font-bold">My 7-Day Opportunity Plan</h1>
      <p className="mb-6 mt-1 text-muted-foreground">Goal: <span className="font-medium text-foreground">{p.target || "set your target role in the Translator"}</span></p>
      <PersonaBar />
      <div className="mb-6 rounded-xl border p-5">
        <div className="mb-2 flex justify-between text-sm font-medium"><span>{n} of 7 completed</span><span className="text-primary">{pct}%</span></div>
        <div className="h-3 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{ width: pct + "%" }} /></div>
      </div>
      <ol className="space-y-3">{plan(p).map(([t, d], i) => {
        const on = !!done[i];
        return (
          <li key={t}><button onClick={() => { const c = [...done]; c[i] = !on; setDone(c); }} className={"flex w-full items-start gap-4 rounded-xl border p-4 text-left transition " + (on ? "border-primary bg-accent" : "hover:border-primary")}>
            <span className={"mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 " + (on ? "border-primary bg-primary text-primary-foreground" : "border-input")}>{on && <Check className="h-4 w-4" />}</span>
            <span><span className="text-xs font-semibold uppercase text-primary">Day {i + 1}</span><span className={"block font-semibold " + (on ? "line-through opacity-70" : "")}>{t}</span><span className="text-sm text-muted-foreground">{d}</span></span>
          </button></li>
        );
      })}</ol>
    </Shell>
  );
}
