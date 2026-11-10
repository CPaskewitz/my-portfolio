import React, { useEffect, useRef, useState } from 'react';
import './Decode.scss';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=';

/**
 * Text that resolves from scrambled glyphs the first time it scrolls into view.
 * The real text stays in the DOM (and in the layout, so nothing shifts); the scramble is an
 * aria-hidden overlay. Skipped entirely under reduced motion.
 */
const Decode: React.FC<{ text: string; duration?: number }> = ({ text, duration = 700 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [scrambled, setScrambled] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const settled = Math.floor(t * text.length);
          let out = '';
          for (let i = 0; i < text.length; i++) {
            const c = text[i];
            out += i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          setScrambled(t < 1 ? out : null);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={`decode ${scrambled ? 'decode--active' : ''}`}>
      <span className="decode__text">{text}</span>
      {scrambled && (
        <span className="decode__overlay" aria-hidden="true">
          {scrambled}
        </span>
      )}
    </span>
  );
};

export default Decode;
