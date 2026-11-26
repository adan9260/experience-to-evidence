import { useEffect, useState } from "react";

export type Profile = {
  name: string;
  origin: string;
  title: string;
  responsibilities: string;
  skills: string;
  years: string;
  target: string;
};

export const emptyProfile: Profile = { name: "", origin: "", title: "", responsibilities: "", skills: "", years: "", target: "" };

export const personas: (Profile & { label: string })[] = [
  {
    label: "Senior Systems Analyst · Sudan",
    name: "Amira Osman", origin: "Sudan", title: "Senior Systems Analyst",
    responsibilities: "Led requirements gathering for a national banking system; managed a team of 6 analysts; designed database migrations; trained staff on new software",
    skills: "SQL, Business Analysis, Agile, Stakeholder Management, Data Modelling, Arabic, English",
    years: "9", target: "Business Analyst in Financial Services",
  },
  {
    label: "Civil Engineer · Ukraine",
    name: "Oleksandr Kovalenko", origin: "Ukraine", title: "Civil Engineer",
    responsibilities: "Supervised construction of residential buildings; prepared technical drawings and cost estimates; ensured safety compliance; coordinated subcontractors",
    skills: "AutoCAD, Project Management, Structural Analysis, Budgeting, Health & Safety, Ukrainian, English",
    years: "12", target: "Site Engineer in Construction",
  },
  {
    label: "Marketing Specialist · Syria",
    name: "Lina Haddad", origin: "Syria", title: "Marketing Specialist",
    responsibilities: "Ran digital campaigns for retail brands; managed social media channels; analysed campaign performance; organised product launch events",
    skills: "Digital Marketing, Social Media, Copywriting, Google Analytics, Event Planning, Arabic, English, French",
    years: "6", target: "Digital Marketing Coordinator",
  },
];

const KEY = "e2e-profile";
const EVT = "e2e-profile-change";

export function useLocal<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    const read = () => {
      try { const r = localStorage.getItem(key); if (r) setVal(JSON.parse(r)); } catch { /* ignore */ }
    };
    read();
    const h = (e: Event) => { if ((e as CustomEvent).detail === key) read(); };
    window.addEventListener(EVT, h);
    return () => window.removeEventListener(EVT, h);
  }, [key]);
  const set = (v: T) => {
    setVal(v);
    localStorage.setItem(key, JSON.stringify(v));
    window.dispatchEvent(new CustomEvent(EVT, { detail: key }));
  };
  return [val, set] as const;
}

export const useProfile = () => useLocal<Profile>(KEY, emptyProfile);

export const list = (s: string) => s.split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
const or = (s: string, d: string) => s.trim() || d;

export function summary(p: Profile) {
  const sk = list(p.skills).slice(0, 4).join(", ");
  return `${or(p.title, "Experienced professional")} with ${or(p.years, "several")} years of experience${p.origin ? ` gained in ${p.origin}` : ""}, now bringing proven expertise to a new role as ${or(p.target, "a team contributor")}. Skilled in ${or(sk, "problem-solving and collaboration")}, I combine international perspective with a strong record of delivering results under challenging conditions. I am adaptable, eager to learn local practices, and motivated to create measurable value for employers and communities.`;
}

const CATS: [string, RegExp, string][] = [
  ["Technical", /sql|cad|data|software|analytics|structural|model|excel|code|google/i, "In demand across local employers"],
  ["Leadership & Management", /manag|lead|budget|project|agile|stakeholder|planning/i, "Valued for team and project roles"],
  ["Communication", /arabic|english|french|ukrainian|copy|social|writing|language/i, "Multilingual skills serve diverse communities"],
];
export function competencies(p: Profile) {
  const out: Record<string, { items: string[]; note: string }> = {};
  for (const s of list(p.skills)) {
    const c = CATS.find(([, r]) => r.test(s));
    const k = c ? c[0] : "Transferable Professional Skills";
    out[k] ??= { items: [], note: c ? c[2] : "Recognised across industries" };
    out[k].items.push(s);
  }
  out["Resilience & Adaptability"] = { items: ["Cross-cultural collaboration", "Working under pressure", "Rapid learning"], note: "Highly regarded by local employers" };
  return out;
}

const VERBS = ["Led", "Delivered", "Streamlined", "Coordinated", "Designed", "Improved"];
const IMPACT = ["improving efficiency by an estimated 20%", "supporting teams of 5+ people", "delivering on time and within budget", "raising quality standards", "reducing errors and rework", "strengthening stakeholder trust"];
export function bullets(p: Profile) {
  const r = list(p.responsibilities);
  const src = r.length ? r : ["core responsibilities in my role"];
  return src.map((x, i) => {
    const t = x.replace(/^(led|managed|ran|supervised|prepared|designed|ensured|organised|organized|coordinated|trained|analysed|analyzed)\s+/i, "");
    return `${VERBS[i % VERBS.length]} ${t}, ${IMPACT[i % IMPACT.length]} [edit with your real figures].`;
  });
}

export type Recipient = "Mentor" | "Recruiter" | "Hiring Manager" | "Industry Peer";
export function message(p: Profile, r: Recipient) {
  const t = or(p.title, "professional"), g = or(p.target, "my field"), y = or(p.years, "several");
  const sk = list(p.skills).slice(0, 2).join(" and ") || "my core skills";
  const sign = `\n\nKind regards,\n${or(p.name, "[Your name]")}`;
  const intro = `Hi [Name],\n\nI'm a ${t} with ${y} years of experience${p.origin ? ` from ${p.origin}` : ""}, now building my career locally in ${g}.`;
  const body: Record<Recipient, string> = {
    Mentor: ` I admire your path in this field and would value 15–20 minutes of your advice on how to adapt my experience to the local market. Would you be open to a short call in the coming weeks?`,
    Recruiter: ` My background in ${sk} aligns with roles such as ${g}. I'd appreciate the chance to share my CV and learn which opportunities you think could be a good fit.`,
    "Hiring Manager": ` I'm very interested in your team's work and believe my experience in ${sk} could add value. Could I ask a few questions about what success looks like in roles like ${g}?`,
    "Industry Peer": ` I noticed we share an interest in ${g}. I'd love to connect, exchange ideas and learn about local professional groups or events you'd recommend.`,
  };
  return intro + body[r] + sign;
}
export const tips: Record<Recipient, string> = {
  Mentor: "Asking for advice, not a job, lowers pressure. A specific, short time request (15–20 min) shows respect for their time.",
  Recruiter: "Recruiters scan quickly. Naming a target role and your top skills helps them match you fast.",
  "Hiring Manager": "Curiosity about the team signals genuine interest. Informational questions are welcomed more than direct job requests.",
  "Industry Peer": "Peer networking is informal and reciprocal. Offering to exchange ideas builds a relationship, not a transaction.",
};

export function plan(p: Profile) {
  const g = or(p.target, "your target role"), sk = list(p.skills)[0] ?? "your strongest skill";
  return [
    ["Audit & Reframing", `Use the Experience Translator to rewrite your experience for ${g}. Pick 3 achievements to highlight.`],
    ["Digital Presence", "Update your LinkedIn headline, About section and photo with your new summary."],
    ["Identify Allies", `List 10 people: mentors, recruiters and peers in ${g}. Include refugee-support networks.`],
    ["Outreach Sprint", "Send 5 personalised messages using the Networking Builder."],
    ["Evidence / Portfolio Snippet", `Create a one-page case study or sample showing ${sk} in action.`],
    ["Local Community", "Attend one meetup, volunteer session or professional association event."],
    ["Follow-up & Review", "Follow up politely with contacts, note responses and plan next week."],
  ] as const;
}
