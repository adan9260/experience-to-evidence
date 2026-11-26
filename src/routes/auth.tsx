import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Shell, inputCls } from "@/components/Shell";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in — Experience2Evidence" },
    { name: "description", content: "Sign in or create your Experience2Evidence account." },
    { property: "og:title", content: "Sign in — Experience2Evidence" },
    { property: "og:description", content: "Sign in to continue building your career path." },
  ] }),
  component: Auth,
});

const G = () => (
  <svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) setMsg(error.message); else void nav({ to: "/translator" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: window.location.origin } });
      setMsg(error ? error.message : "Check your email to confirm your account, then sign in.");
    }
    setBusy(false);
  };
  const social = async (p: "google" | "lovable") => {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin });
    if (r.error) setMsg(String(r.error.message ?? r.error));
    else if (!r.redirected) void nav({ to: "/translator" });
  };

  return (
    <Shell>
      <div className="mx-auto max-w-sm rounded-xl border p-6">
        <h1 className="text-2xl font-bold">{mode === "in" ? "Sign in" : "Create account"}</h1>
        <p className="mb-5 mt-1 text-sm text-muted-foreground">Continue building your career path.</p>
        <div className="space-y-2">
          <button type="button" onClick={() => void social("google")} className="flex w-full items-center justify-center gap-2.5 rounded-md border border-[#747775] bg-[#FFFFFF] px-3 py-2 text-sm font-medium text-[#1F1F1F]"><G />Continue with Google</button>
          <Button type="button" variant="outline" className="w-full" onClick={() => void social("lovable")}><LovableMark />Continue with Lovable</Button>
        </div>
        <div className="my-4 text-center text-xs text-muted-foreground">or with email</div>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" required placeholder="Email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required minLength={6} placeholder="Password" className={inputCls} value={pw} onChange={(e) => setPw(e.target.value)} />
          <Button type="submit" className="w-full" disabled={busy}>{mode === "in" ? "Sign in" : "Sign up"}</Button>
        </form>
        {msg && <p className="mt-3 text-sm text-muted-foreground">{msg}</p>}
        <button className="mt-4 text-sm text-primary hover:underline" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(""); }}>
          {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </Shell>
  );
}
