import React from 'react';
import { corvian, corvianPrinciples, corvianServices } from '../../data/corvian';
import ScanSeam from '../ScanSeam/ScanSeam';
import Icon from '../Icon/Icon';
import './Uplink.scss';

/** Seeded pine ridge, same idea as corvianlabs.com's TreelineDivider (deterministic, no JS at runtime). */
function ridge(seed: number, base: number, amp: number): string {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let d = `M0 120 L0 ${base}`;
  let x = 0;
  while (x < 1440) {
    const w = 14 + rand() * 26;
    const h = amp * (0.4 + rand() * 0.6);
    d += ` L${(x + w / 2).toFixed(1)} ${(base - h).toFixed(1)} L${(x + w).toFixed(1)} ${base}`;
    x += w;
  }
  return `${d} L1440 120 Z`;
}
const RIDGE_BACK = ridge(7, 92, 62);
const RIDGE_FRONT = ridge(31, 108, 48);

/**
 * 04 Corvian Labs: CORE "opens an uplink" and the window switches to Corvian's own world
 * (moonlit navy, teal, Fraunces, the raven). A partner channel, not a re-skin.
 * Assets are copied from the Corvian repo (public/corvian/).
 */
const Uplink: React.FC = () => (
  <section id="corvian-labs" className="section uplink" aria-labelledby="corvian-title">
    <ScanSeam code="04" label="Uplink" />
    <div className="section__inner">
      <p className="uplink__handshake hud-label">
        <span>04 // Uplink</span>
        <span className="uplink__handshake-line" aria-hidden="true" />
        <span>
          Channel <span className="uplink__host">corvianlabs.com</span> <span className="uplink__live"><span className="uplink__dot" aria-hidden="true">●</span> connected</span>
        </span>
      </p>

      <div className="uplink__window reveal">
        <div className="uplink__sky" aria-hidden="true">
          <picture>
            <source media="(max-width: 767px)" srcSet={corvian.backdropMobile} />
            <img src={corvian.backdrop} alt="" loading="lazy" decoding="async" width={1600} height={900} />
          </picture>
          <span className="uplink__mist" />
        </div>

        <img className="uplink__raven" src={corvian.raven} alt="" aria-hidden="true" loading="lazy" decoding="async" width={960} height={720} />

        <div className="uplink__content">
          <div className="uplink__brand">
            <img src={corvian.mark} alt="" width={56} height={56} loading="lazy" />
            <h2 id="corvian-title" className="uplink__title">Corvian Labs</h2>
          </div>
          <p className="uplink__tagline">
            Websites and web apps that help Ontario businesses <em>ship</em>.
          </p>
          <p className="uplink__intro">{corvian.intro}</p>
          <p className="uplink__note">{corvian.nameNote}</p>

          <ul className="uplink__services">
            {corvianServices.map((s, i) => (
              <li key={s.slug} className="uplink__card">
                <span className="uplink__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="uplink__card-title">{s.name}</h3>
                <p>{s.short}</p>
              </li>
            ))}
          </ul>

          <ul className="uplink__principles" aria-label="How Corvian Labs works">
            {corvianPrinciples.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="uplink__cta">
            <a href={corvian.contactUrl} className="uplink__btn uplink__btn--primary" target="_blank" rel="noopener noreferrer">
              Start a project
              <span className="visually-hidden"> with Corvian Labs (opens in a new tab)</span>
              <Icon name="arrowRight" size={18} />
            </a>
            <a href={corvian.url} className="uplink__btn" target="_blank" rel="noopener noreferrer">
              Visit corvianlabs.com
              <span className="visually-hidden"> (opens in a new tab)</span>
              <Icon name="external" size={18} />
            </a>
          </div>
        </div>

        <svg className="uplink__treeline" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d={RIDGE_BACK} className="uplink__ridge-back" />
          <path d={RIDGE_FRONT} className="uplink__ridge-front" />
        </svg>
      </div>
    </div>
  </section>
);

export default Uplink;
