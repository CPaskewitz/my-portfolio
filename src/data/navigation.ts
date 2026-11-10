/** Section index used by the HUD rail, phone dock, command palette and footer. */

export interface NavSection {
  id: string;
  code: string;
  label: string;
  /** Short label for the phone dock. */
  short: string;
  /** Extra words the command palette matches on. */
  keywords: string[];
}

export const navSections: NavSection[] = [
  { id: 'profile', code: '01', label: 'Profile', short: 'Profile', keywords: ['about', 'story', 'bio', 'me'] },
  { id: 'capabilities', code: '02', label: 'Capabilities', short: 'Skills', keywords: ['skills', 'stack', 'tech'] },
  { id: 'projects', code: '03', label: 'Projects', short: 'Work', keywords: ['work', 'portfolio', 'case studies'] },
  { id: 'corvian-labs', code: '04', label: 'Corvian Labs', short: 'Studio', keywords: ['company', 'studio', 'business', 'hire'] },
  { id: 'contact', code: '05', label: 'Contact', short: 'Contact', keywords: ['email', 'message', 'channel', 'hire'] },
];
