import React from 'react';
import './Backdrop.scss';

/** Page-wide decorative layer: a faint projection grid and two coloured light pools. */
const Backdrop: React.FC = () => (
  <div className="backdrop" aria-hidden="true">
    <div className="backdrop__grid" />
    <div className="backdrop__glow backdrop__glow--mint" />
    <div className="backdrop__glow backdrop__glow--rose" />
  </div>
);

export default Backdrop;
