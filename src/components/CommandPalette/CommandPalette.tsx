import React, { useEffect, useMemo, useRef, useState } from 'react';
import { navSections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { allSkills } from '../../data/skills';
import { corvian } from '../../data/corvian';
import { goToSection, useCore } from '../../state/CoreContext';
import { play } from '../../lib/sound';
import Icon from '../Icon/Icon';
import './CommandPalette.scss';

interface Command {
  id: string;
  group: 'Go to' | 'Actions' | 'Projects' | 'Filter by skill';
  label: string;
  hint?: string;
  keywords: string;
  run: () => void;
}

/**
 * "Ask CORE": ⌘K / Ctrl+K / "/" opens a command palette (native modal <dialog>) to jump to a
 * section, download the resume, open a project file or filter projects by a skill.
 * Combobox pattern: the input owns focus, arrow keys move aria-activedescendant.
 */
const CommandPalette: React.FC = () => {
  const { paletteOpen, setPaletteOpen, setSkill, openProject } = useCore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const open = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');
    return [
      ...navSections.map((s) => ({
        id: `go-${s.id}`,
        group: 'Go to' as const,
        label: s.label,
        hint: s.code,
        keywords: `${s.label} ${s.keywords.join(' ')}`,
        run: () => goToSection(s.id),
      })),
      {
        id: 'resume',
        group: 'Actions',
        label: 'Download resume (PDF)',
        keywords: 'resume cv pdf download',
        run: () => {
          const a = document.createElement('a');
          a.href = profile.resume;
          a.download = '';
          a.click();
        },
      },
      { id: 'github', group: 'Actions', label: 'Open GitHub', keywords: 'github code repos', run: open(profile.github) },
      { id: 'linkedin', group: 'Actions', label: 'Open LinkedIn', keywords: 'linkedin connect', run: open(profile.linkedin) },
      { id: 'corvian', group: 'Actions', label: 'Visit Corvian Labs', keywords: 'corvian studio company hire', run: open(corvian.url) },
      {
        id: 'message',
        group: 'Actions',
        label: 'Send a message',
        keywords: 'contact email message hire',
        run: () => {
          goToSection('contact');
          window.setTimeout(() => document.getElementById('name-field')?.focus(), 400);
        },
      },
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        group: 'Projects' as const,
        label: p.title,
        hint: p.code,
        keywords: `${p.title} ${p.summary} ${p.kind}`,
        run: () => openProject(p.id),
      })),
      ...allSkills.map((s) => ({
        id: `skill-${s.id}`,
        group: 'Filter by skill' as const,
        label: s.name,
        keywords: `${s.name} skill filter`,
        run: () => {
          setSkill(s.id);
          goToSection('projects');
        },
      })),
    ];
  }, [openProject, setSkill]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.filter((c) => c.group !== 'Filter by skill');
    return commands.filter((c) => q.split(/\s+/).every((t) => `${c.label} ${c.keywords}`.toLowerCase().includes(t)));
  }, [commands, query]);

  // global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest('input, textarea, [contenteditable="true"]');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setPaletteOpen]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (paletteOpen && !d.open) {
      setQuery('');
      setActive(0);
      d.showModal();
      play('open');
      inputRef.current?.focus();
    } else if (!paletteOpen && d.open) {
      d.close();
    }
  }, [paletteOpen]);

  useEffect(() => setActive(0), [query]);

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    setPaletteOpen(false);
    // run after the dialog closes so focus moves land where the command puts them
    window.setTimeout(cmd.run, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAt(active);
    }
  };

  useEffect(() => {
    document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  let lastGroup = '';
  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Command palette"
      onClose={() => setPaletteOpen(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setPaletteOpen(false);
      }}
    >
      {paletteOpen && (
        <div className="palette__panel holo-panel">
          <div className="palette__search">
            <Icon name="search" />
            <label htmlFor="palette-input" className="visually-hidden">
              Search commands, sections, projects and skills
            </label>
            <input
              ref={inputRef}
              id="palette-input"
              className="palette__input"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              aria-autocomplete="list"
              autoComplete="off"
              spellCheck={false}
              placeholder="Ask CORE: resume, react, contact…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <kbd className="palette__esc" aria-hidden="true">Esc</kbd>
          </div>

          <ul id="palette-list" className="palette__list" role="listbox" aria-label="Results">
            {results.map((c, i) => {
              const header = c.group !== lastGroup ? c.group : null;
              lastGroup = c.group;
              return (
                <React.Fragment key={c.id}>
                  {header && (
                    <li role="presentation" className="palette__group hud-label">
                      {header}
                    </li>
                  )}
                  <li
                    id={`cmd-${c.id}`}
                    role="option"
                    aria-selected={i === active}
                    className={`palette__item ${i === active ? 'is-active' : ''}`}
                    onMouseMove={() => setActive(i)}
                    onClick={() => runAt(i)}
                  >
                    <span>{c.label}</span>
                    {c.hint && <span className="palette__hint">{c.hint}</span>}
                  </li>
                </React.Fragment>
              );
            })}
            {results.length === 0 && (
              <li role="presentation" className="palette__empty">
                No matches. Try “resume”, “projects” or a technology.
              </li>
            )}
          </ul>
          <p className="palette__foot hud-label" aria-hidden="true">
            ↑↓ navigate · Enter run · Esc close
          </p>
        </div>
      )}
    </dialog>
  );
};

export default CommandPalette;
