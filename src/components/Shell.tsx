import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { personas, useProfile } from "@/lib/profile";

const nav = [
  { to: "/", label: "Home" },
  { to: "/translator", label: "Experience Translator" },
  { to: "/networking", label: "Networking Builder" },
  { to: "/plan", label: "My 7-Day Plan" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link to="/" className="text-lg font-bold">Experience<span className="text-primary">2</span>Evidence</Link>
          <nav className="flex flex-wrap gap-1 text-sm">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent" activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}>{n.label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">Supporting SDG 8 Decent Work · SDG 10 Reduced Inequalities · SDG 17 Partnerships — all data stays in your browser.</footer>
    </div>
  );
}

export function PersonaBar() {
  const [, setP] = useProfile();
  return (
    <div className="mb-6 rounded-xl border bg-secondary p-4">
      <p className="mb-2 text-sm font-medium">Quick demo — load a sample persona:</p>
      <div className="flex flex-wrap gap-2">
        {personas.map(({ label, ...p }) => (
          <button key={label} onClick={() => setP(p)} className="rounded-full border border-primary/40 bg-background px-3 py-1 text-sm hover:bg-accent">{label}</button>
        ))}
      </div>
    </div>
  );
}

export function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={() => { void navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }} className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
      {ok ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{ok ? "Copied!" : "Copy"}
    </button>
  );
}

export const Editable = ({ value, onChange, rows = 5 }: { value: string; onChange: (v: string) => void; rows?: number }) => (
  <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full rounded-md border bg-background p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring" />
);

export const EditNote = () => <p className="text-xs text-muted-foreground">✏️ Generated content is a starting point — review and edit it to reflect your real experience.</p>;

export const inputCls = "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
