import React from 'react';
import Decode from '../Decode/Decode';

interface SectionHeadProps {
  id: string;
  code: string;
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
}

/** "02 // CAPABILITIES" eyebrow, decoded h2, optional lede. Used by every section. */
const SectionHead: React.FC<SectionHeadProps> = ({ id, code, eyebrow, title, lede }) => (
  <header className="section-head">
    <p className="section-head__eyebrow">
      {code} // {eyebrow}
    </p>
    <h2 id={id} className="section-head__title">
      <Decode text={title} />
    </h2>
    {lede && <div className="section-head__lede">{lede}</div>}
  </header>
);

export default SectionHead;
