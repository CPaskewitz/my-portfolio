/**
 * Capability matrix: skills grouped into orbits. Project `skills` reference these ids,
 * so picking a skill can light up the projects that use it.
 */

export type SkillId =
  | 'html' | 'css' | 'sass' | 'tailwind' | 'javascript' | 'typescript' | 'react' | 'react-native' | 'nextjs' | 'redux'
  | 'node' | 'php' | 'rest' | 'wordpress'
  | 'mongodb' | 'mysql'
  | 'vercel' | 'heroku'
  | 'jest' | 'a11y' | 'perf'
  | 'openai' | 'chatbots';

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
      { id: 'redux', name: 'Redux', icon: '/reduxicon.png' },
      { id: 'react-native', name: 'React Native', icon: '/reacticon.png' },
      { id: 'html', name: 'HTML', icon: '/htmlicon.png' },
      { id: 'css', name: 'CSS', icon: '/cssicon.png' },
      { id: 'sass', name: 'Sass', icon: '/sassicon.png' },
      { id: 'tailwind', name: 'Tailwind', icon: '/tailwindicon.png' },
    ],
  },
  {
    id: 'backend',
    code: 'BE',
    name: 'Back end',
    skills: [
      { id: 'node', name: 'Node.js', icon: '/nodeicon.png' },
      { id: 'rest', name: 'REST APIs', icon: '/restapiicon.png' },
      { id: 'php', name: 'PHP', icon: '/phpicon.png' },
      { id: 'wordpress', name: 'WordPress', icon: '/wordpressicon.png' },
    ],
  },
  {
    id: 'data',
    code: 'DB',
    name: 'Data',
    skills: [
      { id: 'mongodb', name: 'MongoDB', icon: '/mongodbicon.png' },
      { id: 'mysql', name: 'MySQL', icon: '/mysqlicon.png' },
    ],
  },
  {
    id: 'infra',
    code: 'OPS',
    name: 'Deploy',
    skills: [
      { id: 'vercel', name: 'Vercel', icon: '/vercelicon.png' },
      { id: 'heroku', name: 'Heroku', icon: '/herokuicon.png' },
    ],
  },
  {
    id: 'quality',
    code: 'QA',
    name: 'Quality',
    skills: [
      { id: 'jest', name: 'Jest', icon: '/jesticon.png' },
      { id: 'a11y', name: 'Accessibility' },
      { id: 'perf', name: 'Performance' },
    ],
  },
  {
    id: 'ai',
    code: 'AI',
    name: 'AI',
    skills: [
      { id: 'openai', name: 'OpenAI APIs' },
      { id: 'chatbots', name: 'Help assistants' },
    ],
  },
];

export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills);

export const skillById = (id: SkillId): Skill | undefined => allSkills.find((s) => s.id === id);
