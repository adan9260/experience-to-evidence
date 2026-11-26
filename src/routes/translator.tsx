import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, PersonaBar, CopyBtn, Editable, EditNote, inputCls } from "@/components/Shell";
import { useProfile, summary, competencies, bullets, type Profile } from "@/lib/profile";

export const Route = createFileRoute("/translator")({
  head: () => ({ meta: [
    { title: "Experience Translator — Experience2Evidence" },
    { name: "description", content: "Translate your previous job experience into a professional summary, competencies and achievement bullets." },
    { property: "og:title", content: "Experience Translator — Experience2Evidence" },
    { property: "og:description", content: "Reframe your experience for the local job market." },
  ] }),
  component: Translator,
});

const fields: [keyof Profile, string, boolean][] = [
  ["name", "Your name (optional)", false], ["origin", "Country of experience (optional)", false],
  ["title", "Previous job title", false], ["years", "Years of experience", false],
  ["target", "Target job or industry", false], ["skills", "Skills (comma separated)", true],
  ["responsibilities", "Previous responsibilities (comma or line separated)", true],
];

function Translator() {
  const [p, setP] = useProfile();
  const [out, setOut] = useState<{ s: string; b: string } | null>(null);
  const gen = () => setOut({ s: summary(p), b: bullets(p).map((x) => "• " + x).join("\n") });
  const comps = competencies(p);
  return (
    <Shell>
      <h1 className="text-3xl font-bold">Experience Translator</h1>
      <p className="mb-6 mt-1 text-muted-foreground">Describe your past role. We'll reframe it for local employers.</p>
      <PersonaBar />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border p-5">
          {fields.map(([k, l, area]) => (
            <label key={k} className="block text-sm font-medium">{l}
              {area ? <textarea rows={3} className={inputCls + " mt-1"} value={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.value })} />
                : <input className={inputCls + " mt-1"} value={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.value })} />}
            </label>
          ))}
          <button onClick={gen} className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground hover:bg-primary/90">Translate my experience</button>
        </div>
        <div className="space-y-5">
          {!out ? <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">Fill the form (or pick a persona) and click "Translate my experience".</div> : <>
            <EditNote />
            <section className="rounded-xl border p-5">
              <div className="mb-2 flex items-center justify-between"><h2 className="font-semibold">Professional Summary</h2><CopyBtn text={out.s} /></div>
              <Editable value={out.s} onChange={(s) => setOut({ ...out, s })} rows={7} />
            </section>
            <section className="rounded-xl border p-5">
              <h2 className="mb-3 font-semibold">Transferable Competencies</h2>
              <div className="space-y-3">{Object.entries(comps).map(([c, v]) => (
                <div key={c}><p className="text-sm font-medium">{c} <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">{v.note}</span></p>
                  <div className="mt-1 flex flex-wrap gap-1.5">{v.items.map((i) => <span key={i} className="rounded-md border px-2 py-0.5 text-xs">{i}</span>)}</div></div>
              ))}</div>
            </section>
            <section className="rounded-xl border p-5">
              <div className="mb-2 flex items-center justify-between"><h2 className="font-semibold">Achievement Bullets</h2><CopyBtn text={out.b} /></div>
              <Editable value={out.b} onChange={(b) => setOut({ ...out, b })} rows={8} />
            </section>
            <Link to="/networking" className="inline-block font-medium text-primary hover:underline">Next: build a networking message →</Link>
          </>}
        </div>
      </div>
    </Shell>
  );
}
