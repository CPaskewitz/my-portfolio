import React, { useEffect, useRef, useState } from 'react';
import { afterLoadAndIdle, hasHardwareWebGL } from '../../lib/gpu';
import { profile } from '../../data/profile';

/**
 * Hologram stage: orbit rings with role readouts, the emitter disc and its light cone, and
 * the figure. The figure starts as a CSS hologram treatment of the (already cached) portrait;
 * after load + idle, on hardware WebGL and without reduced motion, the three.js scene
 * (holoScene.ts, its own chunk) replaces it. Entirely decorative: aria-hidden, no pointer events.
 */
const HoloStage: React.FC = () => {
  const figureRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const cancelIdle = afterLoadAndIdle(() => {
      if (!hasHardwareWebGL() || !figureRef.current) return;
      import('./holoScene').then(({ mountHolo }) => {
        if (cancelled || !figureRef.current) return;
        dispose = mountHolo(figureRef.current, {
          photo: profile.photo,
          depth: '/holo/depth.webp',
          autoSway: !window.matchMedia('(hover: hover) and (pointer: fine)').matches,
          onReady: () => setLive(true),
        });
      });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      dispose?.();
    };
  }, []);

  return (
    <div className={`holo-stage ${live ? 'holo-stage--live' : ''}`} aria-hidden="true">
      <svg className="holo-stage__rings" viewBox="0 0 400 400">
        <defs>
          <path id="ring-text-path" d="M200 200m-168 0a168 168 0 1 1 336 0a168 168 0 1 1-336 0" />
        </defs>
        <g className="holo-stage__ring holo-stage__ring--outer">
          <circle cx="200" cy="200" r="190" />
          <text>
            <textPath href="#ring-text-path">
              {profile.roles.join('  //  ').toUpperCase()}  //  {profile.location.toUpperCase()}  //
            </textPath>
          </text>
        </g>
        <g className="holo-stage__ring holo-stage__ring--mid">
          <circle cx="200" cy="200" r="150" />
        </g>
        <g className="holo-stage__ring holo-stage__ring--ticks">
          <circle cx="200" cy="200" r="182" />
        </g>
      </svg>

      <div className="holo-stage__cone" />
      <div className="holo-stage__emitter">
        <span />
        <span />
      </div>

      <div className="holo-stage__figure" ref={figureRef}>
        <img className="holo-stage__fallback" src={profile.photo} alt="" width={600} height={600} {...{ fetchpriority: 'high' }} />
      </div>
    </div>
  );
};

export default HoloStage;
