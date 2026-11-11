import React from 'react';

/** Small inline stroke icons (24px grid, currentColor). Always decorative. */
const paths = {
  download: 'M12 3v12m0 0-5-5m5 5 5-5M4 19h16',
  external: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  arrowRight: 'M4 12h15m0 0-6-6m6 6-6 6',
  arrowUp: 'M12 20V5m0 0-6 6m6-6 6 6',
  close: 'M5 5l14 14M19 5 5 19',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronRight: 'M9 5l7 7-7 7',
  command: 'M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm5-2 4 4',
  github:
    'M9 19c-4 1.3-4-2-6-2.5m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.6 3.1 5.6 3.4 5.6 3.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.8c0 4.6 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3V22',
  linkedin: 'M4 9h4v11H4zM6 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM11 9h3.8v1.6c.5-1 1.8-1.9 3.5-1.9 3.4 0 3.7 2.2 3.7 5V20h-4v-5c0-1.2 0-2.7-1.7-2.7S14.5 13.6 14.5 15v5H11z',
  send: 'M4 12 20 4l-6 16-3-7-7-1z',
  soundOn: 'M4 10v4h4l5 4V6L8 10H4zm12-1.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12',
  soundOff: 'M4 10v4h4l5 4V6L8 10H4zm12 0 5 5m0-5-5 5',
  file: 'M14 3H6v18h12V7l-4-4zm0 0v4h4M9 13h6M9 17h6',
  signal: 'M4 20v-3M9 20v-7M14 20V9M19 20V4',
} as const;

export type IconName = keyof typeof paths;

const Icon: React.FC<{ name: IconName; className?: string; size?: number }> = ({ name, className = '', size = 20 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d={paths[name]} />
  </svg>
);

export default Icon;
