import React from 'react';
import { dossierFacts, milestones, profile } from '../../data/profile';
import SectionHead from '../SectionHead/SectionHead';
import ScanSeam from '../ScanSeam/ScanSeam';
import './Dossier.scss';

/** 01 Profile: the "personnel file". An ID panel beside the story as a milestone log. */
const Dossier: React.FC = () => (
  <section id="profile" className="section dossier" aria-labelledby="profile-title">
    <ScanSeam code="01" label="Personnel file" />
    <div className="section__inner">
      <SectionHead
        id="profile-title"
        code="01"
        eyebrow="Personnel file"
        title="Hi, I'm Corey."
        lede={
          <p>
            A full-stack developer who builds the whole thing: design, the pages people see, the database, accounts,
            email and hosting. I run <a href="#corvian-labs">Corvian Labs</a>, a one-person studio in Cambridge, Ontario.
          </p>
        }
      />

      <div className="dossier__grid">
        <aside className="dossier__id holo-panel reveal" aria-label="Profile summary">
          <div className="dossier__id-head">
            <span className="hud-label">ID // CP-01</span>
            <span className="dossier__badge">{profile.status}</span>
          </div>
          <p className="dossier__name">{profile.name}</p>
          <p className="dossier__role">{profile.roles[0]}</p>
          <dl className="dossier__facts">
            {dossierFacts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <a href={profile.resume} download className="btn btn--primary dossier__cv">
            Download resume (PDF)
          </a>
        </aside>

        <ol className="dossier__log">
          {milestones.map((m) => (
            <li key={m.code} className="dossier__entry reveal">
              <div className="dossier__entry-meta">
                <span className="dossier__code">{m.code}</span>
                <span className="hud-label">{m.label}</span>
              </div>
              <h3 className="dossier__entry-title">{m.title}</h3>
              <p className="dossier__entry-body redact">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Dossier;
