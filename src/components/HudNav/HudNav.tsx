import React, { useEffect, useState } from 'react';
import { navSections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { goToSection, useCore } from '../../state/CoreContext';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import SoundToggle from '../SoundToggle/SoundToggle';
import './HudNav.scss';

/**
 * HUD navigation. Desktop: a fixed left rail with the section index, a scroll-progress
 * line, the command palette and the resume. Phone: a bottom dock with the same sections
 * and the resume. One component, one set of links, laid out per screen size in CSS.
 */
const HudNav: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const { setPaletteOpen } = useCore();

  // Scroll-spy: the section crossing the middle band of the viewport is active.
  useEffect(() => {
    const els = navSections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const hero = document.getElementById('top');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? '' : e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    goToSection(id);
  };

  return (
    <nav className="hud-nav" aria-label="Main">
      <a href="#top" className="hud-nav__home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <Logo size={40} />
        <span className="visually-hidden">Corey Paskewitz, back to top</span>
      </a>

      <span className="hud-nav__progress" aria-hidden="true" />

      <ul className="hud-nav__list">
        {navSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`hud-nav__link ${active === s.id ? 'is-active' : ''}`}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={(e) => onNav(e, s.id)}
            >
              <span className="hud-nav__code" aria-hidden="true">{s.code}</span>
              <span className="hud-nav__label hud-nav__label--full">{s.label}</span>
              <span className="hud-nav__label hud-nav__label--short" aria-hidden="true">{s.short}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="hud-nav__tools">
        <button type="button" className="hud-nav__tool hud-nav__tool--palette" onClick={() => setPaletteOpen(true)}>
          <Icon name="command" size={18} />
          <span className="visually-hidden">Open command palette</span>
          <kbd className="hud-nav__kbd" aria-hidden="true">⌘K</kbd>
        </button>
        <SoundToggle className="hud-nav__tool hud-nav__tool--sound" />
        <a href={profile.resume} download className="hud-nav__tool hud-nav__resume">
          <Icon name="download" size={18} />
          <span className="hud-nav__resume-text">CV</span>
          <span className="visually-hidden">Download resume (PDF)</span>
        </a>
      </div>
    </nav>
  );
};

export default HudNav;
