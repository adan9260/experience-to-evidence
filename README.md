# Experience To Evidence

Build a lightweight, polished and functional web application called **Experience2Evidence**.

Tagline: "Your experience. Translated into opportunity."

The platform addresses the local experience and professional networking gap faced by skilled refugees. Many refugees already have valuable professional experience but struggle to communicate their transferable skills, build local visibility and access professional networks.

Build a simple hackathon-ready MVP with a shared browser profile in localStorage fueling three linked tools. Minimize development complexity and credit usage. Do not overengineer.

### SHARED BROWSER PROFILE & QUICK DEMO
- Provide a persistent local storage state so details entered in any tool (or selected via sample personas) automatically prefill the other tools.
- Include 2-3 one-click sample personas (e.g., Senior Systems Analyst from Sudan, Civil Engineer from Ukraine, Marketing Specialist from Syria) so hackathon judges can immediately test the entire workflow in one click without typing paragraphs.

### FEATURE 1: EXPERIENCE TRANSLATOR
- Form inputs: Previous job title, previous responsibilities, skills, years of experience, target job or industry.
- Client-side generation logic and templates outputting:
  1. Professional Career Summary (LinkedIn/CV "About Me" bio).
  2. Categorized Transferable Competencies tagged with local relevance.
  3. Achievement-focused bullet points re-framed using strong action verbs and impact metrics.
- Content is fully editable inline with copy-to-clipboard functionality.

### FEATURE 2: PROFESSIONAL NETWORKING MESSAGE BUILDER
- Select recipient type: Mentor, Recruiter, Hiring Manager/Employer, Industry Peer.
- Uses the user's career background and goal to generate a personalized, culturally appropriate outreach message.
- Includes a concise "Why this works" cultural communication tip explaining why concise informational requests succeed.
- Copy button with visual feedback.

### FEATURE 3: 7-DAY PROFESSIONAL OPPORTUNITY PLAN
- Based on the user's career goal and skills, generates a structured 7-day action plan (e.g., Day 1: Audit & Reframing, Day 2: Digital Presence, Day 3: Identify Allies, Day 4: Outreach Sprint, Day 5: Evidence/Portfolio Snippet, Day 6: Local Community, Day 7: Follow-up & Review).
- Interactive checklist where users can mark tasks complete, with a visual progress bar (e.g., "3 of 7 completed - 43%") and persistence in local storage.

### DESIGN & BRANDING
- Modern, professional and responsive design.
- White background, deep navy typography (slate-900), vibrant teal accents, clean cards and intuitive navigation.
- Landing page headline: "Your experience is valuable. Let's make it visible."
- Subheadline: "Turn your professional experience into stronger profiles, meaningful connections and practical pathways to work."
- Primary button: "Start Building My Career Path".

### NAVIGATION
- Home
- Experience Translator
- Networking Builder
- My 7-Day Plan

### TECHNICAL REQUIREMENTS
- Build a real, interactive application with client-side JavaScript/TypeScript logic and reusable templates.
- No paid AI APIs, no external backend, no authentication required.
- Everything persists locally in localStorage.
- Responsive for mobile, tablet, and desktop.
- Clearly communicate that generated content is editable and reviewable.
- Support SDG 8 (Decent Work), SDG 10 (Reduced Inequalities) and SDG 17 (Partnerships).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://experience-to-evidence.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0b564662-97c4-4bd7-8646-35da3be65bda).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
