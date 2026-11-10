/** Section index used by the HUD rail, phone dock, command palette and footer. */

export interface NavSection {
  id: string;
  code: string;
  label: string;
  /** Extra words the command palette matches on. */
  keywords: string[];
}

export const navSections: NavSection[] = [
  { id: 'profile', code: '01', label: 'Profile', keywords: ['about', 'story', 'bio', 'me'] },
  { id: 'capabilities', code: '02', label: 'Capabilities', keywords: ['skills', 'stack', 'tech'] },
  { id: 'projects', code: '03', label: 'Projects', keywords: ['work', 'portfolio', 'case studies'] },
  { id: 'corvian-labs', code: '04', label: 'Corvian Labs', keywords: ['company', 'studio', 'business', 'hire'] },
  { id: 'contact', code: '05', label: 'Contact', keywords: ['email', 'message', 'channel', 'hire'] },
];
