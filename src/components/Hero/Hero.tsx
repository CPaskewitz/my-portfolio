import React, { useEffect, useState } from 'react';
import { profile, socialLinks } from '../../data/profile';
import { goToSection, useCore } from '../../state/CoreContext';
import Icon from '../Icon/Icon';
import HoloStage from './HoloStage';
import BootLog from './BootLog';
import './Hero.scss';

function cambridgeTime() {
  return new Intl.DateTimeFormat('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: profile.timeZone,
  }).format(new Date());
}

const Hero: React.FC = () => {
  const { setPaletteOpen } = useCore();
  const [time, setTime] = useState(cambridgeTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(cambridgeTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow hud-label">
            <span className="hero__pulse" aria-hidden="true" />
            CORE <span className="hero__slash">//</span> Profile online
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__first">Corey</span>
            <span className="hero__last">Paskewitz</span>
          </h1>

          <p className="hero__roles">
            {profile.roles.map((role, i) => (
              <React.Fragment key={role}>
                {i > 0 && <span className="hero__slash" aria-hidden="true"> // </span>}
                {i > 0 && <span className="visually-hidden">, </span>}
                <span>{role}</span>
              </React.Fragment>
            ))}
          </p>

          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                goToSection('projects');
              }}
            >
              View projects
              <Icon name="arrowRight" className="btn__icon" />
            </a>
            <a href={profile.resume} download className="btn">
              <Icon name="download" className="btn__icon" />
              Download resume
            </a>
            <button type="button" className="btn btn--rose hero__ask" onClick={() => setPaletteOpen(true)}>
              <Icon name="search" className="btn__icon" />
              Ask CORE
              <kbd className="hero__kbd" aria-hidden="true">⌘K</kbd>
            </button>
          </div>

          <ul className="hero__social">
            {socialLinks
              .filter((l) => l.id !== 'resume')
              .map((l) => (
                <li key={l.id}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="hero__social-link">
                    <Icon name={l.id === 'github' ? 'github' : 'linkedin'} size={18} />
                    {l.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <HoloStage />
      </div>

      <dl className="hero__readouts">
        <div>
          <dt>Local time</dt>
          <dd>
            <time>{time}</time> Cambridge, ON
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className="hero__status">{profile.status}</dd>
        </div>
        <div className="hero__readout--wide" aria-hidden="true">
          <dt>Coordinates</dt>
          <dd>43.36° N · 80.31° W</dd>
        </div>
      </dl>

      <BootLog />
    </section>
  );
};

export default Hero;
