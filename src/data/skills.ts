/**
 * Capability matrix: skills grouped into orbits. Project `skills` reference these ids,
 * so picking a skill can light up the projects that use it.
 */

export type SkillId =
  | 'react' | 'nextjs' | 'typescript' | 'javascript' | 'tailwind' | 'redux' | 'zustand' | 'threejs' | 'sass'
  | 'node' | 'express' | 'rest' | 'websockets' | 'postgres' | 'prisma' | 'mongodb' | 'mysql' | 'redis'
  | 'claude' | 'openai' | 'on-device-ai' | 'chatbots'
  | 'swiftui' | 'react-native' | 'capacitor'
  | 'vercel' | 'aws' | 'cloudflare' | 'auth' | 'stripe' | 'heroku'
  | 'jest' | 'vitest' | 'playwright' | 'a11y' | 'perf';

export interface Skill {
  id: SkillId;
  name: string;
  /** Icon in /public, optional (concept skills have none). */
  icon?: string;
}

export interface SkillGroup {
  id: string;
  code: string;
  name: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    code: 'FE',
    name: 'Front end',
    skills: [
      { id: 'react', name: 'React', icon: '/reacticon.png' },
      { id: 'nextjs', name: 'Next.js', icon: '/nextjsicon.png' },
      { id: 'typescript', name: 'TypeScript', icon: '/typescripticon.png' },
      { id: 'javascript', name: 'JavaScript', icon: '/javascripticon.png' },
      { id: 'tailwind', name: 'Tailwind', icon: '/tailwindicon.png' },
      { id: 'redux', name: 'Redux', icon: '/reduxicon.png' },
      { id: 'zustand', name: 'Zustand' },
      { id: 'threejs', name: 'three.js / WebGL' },
      { id: 'sass', name: 'Sass', icon: '/sassicon.png' },
    ],
  },
  {
    id: 'backend',
    code: 'BE',
    name: 'Back end & data',
    skills: [
      { id: 'node', name: 'Node.js', icon: '/nodeicon.png' },
      { id: 'express', name: 'Express' },
      { id: 'rest', name: 'REST APIs', icon: '/restapiicon.png' },
      { id: 'websockets', name: 'WebSockets' },
      { id: 'postgres', name: 'PostgreSQL' },
      { id: 'prisma', name: 'Prisma' },
      { id: 'mongodb', name: 'MongoDB', icon: '/mongodbicon.png' },
      { id: 'mysql', name: 'MySQL', icon: '/mysqlicon.png' },
      { id: 'redis', name: 'Redis' },
    ],
  },
  {
    id: 'ai',
    code: 'AI',
    name: 'AI',
    skills: [
      { id: 'claude', name: 'Claude API' },
      { id: 'openai', name: 'OpenAI API' },
      { id: 'on-device-ai', name: 'On-device AI' },
      { id: 'chatbots', name: 'Help assistants' },
    ],
  },
  {
    id: 'mobile',
    code: 'APP',
    name: 'Mobile',
    skills: [
      { id: 'swiftui', name: 'Swift / SwiftUI' },
      { id: 'react-native', name: 'React Native', icon: '/reacticon.png' },
      { id: 'capacitor', name: 'Capacitor' },
    ],
  },
  {
    id: 'infra',
    code: 'OPS',
    name: 'Cloud, auth & payments',
    skills: [
      { id: 'vercel', name: 'Vercel', icon: '/vercelicon.png' },
      { id: 'aws', name: 'AWS' },
      { id: 'cloudflare', name: 'Cloudflare Workers' },
      { id: 'auth', name: 'Auth & RBAC' },
      { id: 'stripe', name: 'Stripe' },
      { id: 'heroku', name: 'Heroku', icon: '/herokuicon.png' },
    ],
  },
  {
    id: 'quality',
    code: 'QA',
    name: 'Quality',
    skills: [
      { id: 'a11y', name: 'Accessibility' },
      { id: 'perf', name: 'Performance' },
      { id: 'playwright', name: 'Playwright' },
      { id: 'vitest', name: 'Vitest' },
      { id: 'jest', name: 'Jest', icon: '/jesticon.png' },
    ],
  },
];
// Retired from the matrix (Nov 2026): HTML, CSS, PHP, WordPress (basics / only used by the
// original Leap Into Lessons, which is archived in projects.ts).

export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills);

export const skillById = (id: SkillId): Skill | undefined => allSkills.find((s) => s.id === id);
