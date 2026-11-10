/**
 * Who the site is about: identity, links and the "personnel file" story.
 * Components import from here so copy lives in one place.
 */

export const profile = {
  name: 'Corey Paskewitz',
  firstName: 'Corey',
  roles: ['Full-stack developer', 'Software engineer', 'Founder, Corvian Labs'],
  location: 'Cambridge, Ontario',
  timeZone: 'America/Toronto',
  status: 'Accepting projects',
  url: 'https://www.cpaskewitz.com',
  photo: '/myImage.webp',
  resume: '/Corey_Paskewitz_Resume.pdf',
  github: 'https://github.com/CPaskewitz',
  linkedin: 'https://www.linkedin.com/in/corey-paskewitz',
  /** One-line pitch under the hero headline. */
  tagline:
    'I design, build and ship websites, booking systems and custom web apps, end to end, from the database to the last pixel.',
} as const;

export interface SocialLink {
  id: 'github' | 'linkedin' | 'resume';
  label: string;
  href: string;
  /** Accessible name when the visible text is short. */
  ariaLabel: string;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: profile.github, ariaLabel: 'GitHub profile', external: true },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, ariaLabel: 'LinkedIn profile', external: true },
  { id: 'resume', label: 'Resume', href: profile.resume, ariaLabel: 'Download resume (PDF)', external: false },
];

export interface Milestone {
  code: string;
  label: string;
  title: string;
  body: string;
}

/** About section: the story, told as a dossier timeline. */
export const milestones: Milestone[] = [
  {
    code: 'LOG-01',
    label: 'Origin',
    title: 'People first',
    body: 'Years in customer service and team leadership taught me to listen for the real problem behind a request, and to explain technical trade-offs in plain language.',
  },
  {
    code: 'LOG-02',
    label: 'The build years',
    title: 'A product studio',
    body: 'I founded Corvian Labs to design, build and launch my own software: an AI email-outreach platform and a journaling app that is live on the App Store. Doing it solo meant learning every layer: design, front end, back end, databases, email, payments, hosting and SEO.',
  },
  {
    code: 'LOG-03',
    label: 'The turn',
    title: 'Local businesses ask for help',
    body: 'A swim school needed to replace WordPress and a spreadsheet with real online booking. A new coalition of humane societies needed a fast, accessible home on the web. That client work was the most satisfying I had done, so it became the focus.',
  },
  {
    code: 'LOG-04',
    label: 'Today',
    title: 'Client work, end to end',
    body: 'Online stores, AI help assistants, booking platforms and software consulting for teams across Ontario and the US, all with accessibility, performance and maintainability treated as defaults, not extras.',
  },
];

/** Short facts shown beside the dossier. */
export const dossierFacts: { label: string; value: string }[] = [
  { label: 'Base', value: 'Cambridge, ON' },
  { label: 'Serves', value: 'KW · Guelph · Canada · US' },
  { label: 'Studio', value: 'Corvian Labs' },
  { label: 'Defaults', value: 'WCAG 2.1 AA · Core Web Vitals' },
];
