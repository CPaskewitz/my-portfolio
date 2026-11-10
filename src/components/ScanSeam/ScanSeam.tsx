import React from 'react';
import './ScanSeam.scss';

/**
 * Section divider: a thin line of light with data ticks that draws itself as you scroll.
 * Absolutely positioned at the top of its section, so it adds no height (no stacked spacing on phones).
 */
const ScanSeam: React.FC<{ code: string; label: string }> = ({ code, label }) => (
  <div className="scan-seam" aria-hidden="true">
    <span className="scan-seam__label">
      {code} <span className="scan-seam__slash">//</span> {label}
    </span>
    <span className="scan-seam__line" />
    <span className="scan-seam__ticks" />
  </div>
);

export default ScanSeam;
