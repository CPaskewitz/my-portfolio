import React, { useEffect, useState } from 'react';

const LINES = ['CORE v3.0 boot', 'linking profile… ok', 'loading projects… 5 files', 'uplink: corvian labs… ok', 'projection online'];
const KEY = 'core-booted';

/**
 * First-visit boot sequence: a scan line sweeps the hero once while a short log prints in
 * the corner (~0.9 s). It never covers the headline (which paints first), it's decorative
 * (aria-hidden, no pointer events), and it's skipped on repeat visits and under reduced motion.
 */
const BootLog: React.FC = () => {
  const [lines, setLines] = useState<number>(-1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* storage blocked: just play it */
    }
    if (seen) return;
    setLines(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLines(i);
      if (i >= LINES.length + 3) {
        window.clearInterval(id);
        try {
          sessionStorage.setItem(KEY, '1');
        } catch {
          /* ignore */
        }
      }
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  if (lines < 0 || lines >= LINES.length + 3) return null;

  return (
    <div className="boot" aria-hidden="true">
      <div className="boot__scan" />
      <ol className="boot__log">
        {/* every line is laid out from the start (no size change, no layout shift); they appear in turn */}
        {LINES.map((l, i) => (
          <li key={l} style={{ visibility: i <= lines ? 'visible' : 'hidden' }}>
            &gt; {l}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BootLog;
