import React from 'react';
import './Logo.scss';

/**
 * CP monogram: a segmented mint "C" emitter ring around a white "P" whose bowl holds the
 * amber lens, inside a dotted rose orbit. Same geometry as public/cp-logo.svg (favicon).
 * Decorative by default; pass `title` to make it an image with a name.
 */
const Logo: React.FC<{ size?: number; title?: string; className?: string }> = ({ size = 40, title, className = '' }) => (
  <svg
    className={`logo ${className}`}
    viewBox="0 0 64 64"
    width={size}
    height={size}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
  >
    <path className="logo__orbit" d="M54.6 51A29.5 29.5 0 1 1 54.6 13" />
    <circle className="logo__ring" cx="32" cy="32" r="25" transform="rotate(40 32 32)" />
    <path className="logo__p" d="M25 47V18h9.5a8.5 8.5 0 0 1 0 17H25" />
    <circle className="logo__lens" cx="34.5" cy="26.5" r="2.6" />
  </svg>
);

export default Logo;
