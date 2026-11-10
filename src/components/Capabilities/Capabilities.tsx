import React from 'react';
import { skillGroups, skillById } from '../../data/skills';
import { projects } from '../../data/projects';
import { goToSection, useCore } from '../../state/CoreContext';
import SectionHead from '../SectionHead/SectionHead';
import ScanSeam from '../ScanSeam/ScanSeam';
import Icon from '../Icon/Icon';
import './Capabilities.scss';

/**
 * 02 Capabilities: skills grouped into orbits. Picking a skill focuses it across the site:
 * the projection bay below filters to the projects that use it.
 */
const Capabilities: React.FC = () => {
  const { skill, setSkill } = useCore();
  const matches = skill ? projects.filter((p) => p.skills.includes(skill)).length : 0;

  return (
    <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-title">
      <ScanSeam code="02" label="Capability matrix" />
      <div className="section__inner">
        <SectionHead
          id="capabilities-title"
          code="02"
          eyebrow="Capability matrix"
          title="What I build with"
          lede={<p>Pick a skill to see the projects that use it.</p>}
        />

        <div className="capabilities__grid">
          {skillGroups.map((group) => (
            <div key={group.id} className="capabilities__group holo-panel reveal">
              <svg className="capabilities__orbit" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="44" />
                <circle cx="60" cy="60" r="56" className="capabilities__orbit-outer" />
                <g className="capabilities__nodes">
                  {group.skills.map((s, i) => {
                    const a = (i / group.skills.length) * Math.PI * 2 - Math.PI / 2;
                    return (
                      <circle
                        key={s.id}
                        cx={60 + Math.cos(a) * 44}
                        cy={60 + Math.sin(a) * 44}
                        r={s.id === skill ? 4.5 : 2.6}
                        className={s.id === skill ? 'is-on' : ''}
                      />
                    );
                  })}
                </g>
                <text x="60" y="64" textAnchor="middle">{group.code}</text>
              </svg>

              <h3 className="capabilities__name">
                {group.name}
                <span className="capabilities__count">{String(group.skills.length).padStart(2, '0')}</span>
              </h3>

              <ul className="capabilities__skills">
                {group.skills.map((s) => {
                  const on = s.id === skill;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        className={`chip capabilities__skill ${on ? 'chip--on' : ''}`}
                        aria-pressed={on}
                        onClick={() => setSkill(on ? null : s.id)}
                      >
                        {s.icon && <img src={s.icon} alt="" width={16} height={16} loading="lazy" />}
                        {s.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="capabilities__focus" aria-live="polite">
          {skill && (
            <>
              <span>
                <span className="hud-label">Focus</span> {skillById(skill)?.name}: {matches}{' '}
                {matches === 1 ? 'project' : 'projects'}
              </span>
              {matches > 0 && (
                <a
                  href="#projects"
                  className="btn btn--primary"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection('projects');
                  }}
                >
                  Show projects
                  <Icon name="arrowRight" className="btn__icon" />
                </a>
              )}
              <button type="button" className="btn" onClick={() => setSkill(null)}>
                Clear
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
