import React, { useEffect, useRef, useState } from 'react';
import { navSections } from '../../data/navigation';
import { profile, socialLinks } from '../../data/profile';
import { corvian } from '../../data/corvian';
import { goToSection } from '../../state/CoreContext';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import SoundToggle from '../SoundToggle/SoundToggle';
import './StatusBar.scss';

const fmt = (s: number) =>
  [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':');

/** Footer as a system status bar: identity, links, section index, build and session uptime. */
const StatusBar: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [uptime, setUptime] = useState(0);

  // Only tick while the footer is on screen.
  useEffect(() => {
    let id: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      if (e.isIntersecting) {
        setUptime(Math.floor(performance.now() / 1000));
        id = window.setInterval(() => setUptime(Math.floor(performance.now() / 1000)), 1000);
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  return (
    <footer ref={ref} className="status-bar">
      <div className="status-bar__inner">
        <div className="status-bar__id">
          <Logo size={44} />
          <div>
            <p className="status-bar__name">{profile.name}</p>
            <p className="hud-label">{profile.roles[0]} · {profile.location}</p>
          </div>
        </div>

        <nav className="status-bar__nav" aria-label="Footer">
          <ul>
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(s.id);
                  }}
                >
                  <span aria-hidden="true">{s.code}</span> {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            {socialLinks.map((l) => (
              <li key={l.id}>
                <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}>
                  {l.id === 'resume' ? 'Resume (PDF)' : l.label}
                  {l.external && <span className="visually-hidden"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
            <li>
              <a href={corvian.url} target="_blank" rel="noopener noreferrer">
                Corvian Labs<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="status-bar__bottom">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="status-bar__sys" aria-hidden="true">
            <span>CORE v3.0</span>
            <span>build {__BUILD_SHA__}</span>
            <span>session {fmt(uptime)}</span>
          </p>
          <SoundToggle className="status-bar__sound" withLabel />
          <button type="button" className="status-bar__top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Icon name="arrowUp" size={16} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
