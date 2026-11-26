import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Shell, PersonaBar, CopyBtn, Editable, EditNote, inputCls } from "@/components/Shell";
import { useProfile, message, tips, type Recipient } from "@/lib/profile";

export const Route = createFileRoute("/networking")({
  head: () => ({ meta: [
    { title: "Networking Message Builder — Experience2Evidence" },
    { name: "description", content: "Write personalised, culturally appropriate outreach to mentors, recruiters, employers and peers." },
    { property: "og:title", content: "Networking Message Builder — Experience2Evidence" },
    { property: "og:description", content: "Professional outreach messages that open doors." },
  ] }),
  component: Networking,
});

const types: Recipient[] = ["Mentor", "Recruiter", "Hiring Manager", "Industry Peer"];

function Networking() {
  const [p, setP] = useProfile();
  const [r, setR] = useState<Recipient>("Mentor");
  const [msg, setMsg] = useState("");
  useEffect(() => setMsg(message(p, r)), [p, r]);
  return (
    <Shell>
      <h1 className="text-3xl font-bold">Networking Message Builder</h1>
      <p className="mb-6 mt-1 text-muted-foreground">Uses your saved profile to draft a short, respectful outreach message.</p>
      <PersonaBar />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4 rounded-xl border p-5">
          <p className="text-sm font-medium">Who are you contacting?</p>
          <div className="grid grid-cols-2 gap-2">{types.map((t) => (
            <button key={t} onClick={() => setR(t)} className={"rounded-lg border px-3 py-2 text-sm " + (t === r ? "border-primary bg-accent font-semibold text-accent-foreground" : "hover:bg-accent")}>{t}</button>
          ))}</div>
          <label className="block text-sm font-medium">Your background<input className={inputCls + " mt-1"} value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} /></label>
          <label className="block text-sm font-medium">Your career goal<input className={inputCls + " mt-1"} value={p.target} onChange={(e) => setP({ ...p, target: e.target.value })} /></label>
          <div className="rounded-lg bg-accent p-4 text-sm text-accent-foreground"><p className="mb-1 flex items-center gap-1 font-semibold"><Lightbulb className="h-4 w-4" /> Why this works</p>{tips[r]} Short, specific informational requests are easy to say yes to.</div>
        </div>
        <div className="space-y-3 rounded-xl border p-5">
          <div className="flex items-center justify-between"><h2 className="font-semibold">Message to a {r}</h2><CopyBtn text={msg} /></div>
          <Editable value={msg} onChange={setMsg} rows={14} />
          <EditNote />
          <Link to="/plan" className="inline-block font-medium text-primary hover:underline">Next: start your 7-day plan →</Link>
        </div>
      </div>
    </Shell>
  );
}
