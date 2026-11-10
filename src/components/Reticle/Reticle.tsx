import React, { useEffect, useRef } from 'react';
import './Reticle.scss';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [role="option"]';

/**
 * Targeting reticle that trails a fine pointer and locks onto interactive elements.
 * An accent only: the native cursor stays visible, it never takes events, and it isn't
 * mounted for touch/coarse pointers or reduced motion.
 */
const Reticle: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let w = 28;
    let h = 28;
    let tw = 28;
    let th = 28;
    let raf = 0;
    let locked: Element | null = null;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (target !== locked) {
        locked = target;
        el.classList.toggle('is-locked', !!target);
      }
      el.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => el.classList.remove('is-on');

    const tick = () => {
      raf = 0;
      if (locked) {
        const r = locked.getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top + r.height / 2;
        tw = r.width + 12;
        th = r.height + 12;
      } else {
        tw = 28;
        th = 28;
      }
      cx += (x - cx) * 0.3;
      cy += (y - cy) * 0.3;
      w += (tw - w) * 0.3;
      h += (th - h) * 0.3;
      el.style.transform = `translate3d(${cx - w / 2}px, ${cy - h / 2}px, 0)`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      if (Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3 || Math.abs(tw - w) > 0.3 || Math.abs(th - h) > 0.3) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    const onScroll = () => {
      if (locked && !raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="reticle" aria-hidden="true">
      <span /><span /><span /><span />
    </div>
  );
};

export default Reticle;
