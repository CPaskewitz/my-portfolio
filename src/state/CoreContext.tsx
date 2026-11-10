import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { SkillId } from '../data/skills';

/**
 * Cross-section state: the skill currently focused in the capability matrix (filters the
 * projection bay), the project file that's open, and the command palette.
 */
interface CoreState {
  skill: SkillId | null;
  setSkill: (id: SkillId | null) => void;
  openProjectId: string | null;
  openProject: (id: string | null) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

const CoreContext = createContext<CoreState | null>(null);

export const CoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skill, setSkillState] = useState<SkillId | null>(null);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const setSkill = useCallback((id: SkillId | null) => setSkillState(id), []);
  const openProject = useCallback((id: string | null) => setOpenProjectId(id), []);

  const value = useMemo(
    () => ({ skill, setSkill, openProjectId, openProject, paletteOpen, setPaletteOpen }),
    [skill, setSkill, openProjectId, openProject, paletteOpen]
  );
  return <CoreContext.Provider value={value}>{children}</CoreContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCore(): CoreState {
  const ctx = useContext(CoreContext);
  if (!ctx) throw new Error('useCore must be used inside <CoreProvider>');
  return ctx;
}

/** Scroll a section into view and move focus to its heading for keyboard and screen-reader users. */
// eslint-disable-next-line react-refresh/only-export-components
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const heading = el.querySelector<HTMLElement>('h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
  history.replaceState(null, '', `#${id}`);
}
