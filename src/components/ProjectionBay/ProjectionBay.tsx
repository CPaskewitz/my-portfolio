import React, { useCallback, useMemo, useRef } from 'react';
import { projects } from '../../data/projects';
import { skillById, type SkillId } from '../../data/skills';
import { useCore } from '../../state/CoreContext';
import SectionHead from '../SectionHead/SectionHead';
import ScanSeam from '../ScanSeam/ScanSeam';
import Icon from '../Icon/Icon';
import ProjectFile from './ProjectFile';
import './ProjectionBay.scss';

/** Quick filters shown above the grid (the full set lives in the capability matrix). */
const QUICK: SkillId[] = ['react', 'nextjs', 'typescript', 'node', 'mongodb', 'a11y', 'wordpress'];

/**
 * 03 Projects: holo panels with the screenshot in a browser frame, tilting toward a fine
 * pointer. "Open file" opens the full viewer (a native modal dialog). Filtered by the skill
 * focused in the capability matrix or the quick filters.
 */
const ProjectionBay: React.FC = () => {
  const { skill, setSkill, openProject } = useCore();
  const visible = useMemo(() => (skill ? projects.filter((p) => p.skills.includes(skill)) : projects), [skill]);
  const reduceRef = useRef<boolean | null>(null);

  // Pointer tilt: sets CSS vars on the panel; CSS does the transform (fine pointers only).
  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    reduceRef.current ??= window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceRef.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tilt-x', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
    el.style.setProperty('--tilt-y', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
  }, []);
  const onLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.removeProperty('--tilt-x');
    e.currentTarget.style.removeProperty('--tilt-y');
  }, []);

  return (
    <section id="projects" className="section bay" aria-labelledby="projects-title">
      <ScanSeam code="03" label="Projection bay" />
      <div className="section__inner">
        <SectionHead
          id="projects-title"
          code="03"
          eyebrow="Projection bay"
          title="Selected projects"
          lede={<p>Client builds and personal projects. Open a file for screenshots, details and links.</p>}
        />

        <div className="bay__filters" role="group" aria-label="Filter projects by skill">
          <button type="button" className={`chip bay__filter ${!skill ? 'chip--on' : ''}`} aria-pressed={!skill} onClick={() => setSkill(null)}>
            All
          </button>
          {QUICK.map((id) => (
            <button
              key={id}
              type="button"
              className={`chip bay__filter ${skill === id ? 'chip--on' : ''}`}
              aria-pressed={skill === id}
              onClick={() => setSkill(skill === id ? null : id)}
            >
              {skillById(id)?.name}
            </button>
          ))}
          {skill && !QUICK.includes(skill) && (
            <button type="button" className="chip chip--on bay__filter" aria-pressed="true" onClick={() => setSkill(null)}>
              {skillById(skill)?.name}
              <Icon name="close" size={14} />
              <span className="visually-hidden">(clear filter)</span>
            </button>
          )}
        </div>
        <p className="bay__count hud-label" aria-live="polite">
          Showing {visible.length} of {projects.length} files
          {skill ? ` · ${skillById(skill)?.name}` : ''}
          {visible.length > 1 && <span className="bay__swipe" aria-hidden="true"> · swipe →</span>}
        </p>

        <ul className="bay__grid" aria-label="Projects">
          {visible.map((p) => (
            <li key={p.id} className="bay__item reveal">
              <article className="bay__panel holo-panel holo-panel--interactive" onPointerMove={onMove} onPointerLeave={onLeave} aria-labelledby={`${p.id}-title`}>
                <div className="bay__frame">
                  <div className="bay__chrome" aria-hidden="true">
                    <span /><span /><span />
                    <span className="bay__url">{p.link ? new URL(p.link).hostname : `${p.id}.local`}</span>
                  </div>
                  <div className="bay__shot">
                    <img src={p.images[0]} alt="" loading="lazy" decoding="async" width={1280} height={800} />
                  </div>
                </div>

                <div className="bay__body">
                  <div className="bay__meta">
                    <span className="bay__code">{p.code}</span>
                    <span className="hud-label">{p.kind}</span>
                  </div>
                  <h3 id={`${p.id}-title`} className="bay__title">{p.title}</h3>
                  <p className="bay__summary">{p.summary}</p>
                  <ul className="bay__tags" aria-label="Built with">
                    {p.skills.slice(0, 5).map((s) => (
                      <li key={s} className={`chip ${s === skill ? 'chip--on' : ''}`}>{skillById(s)?.name}</li>
                    ))}
                  </ul>
                  <div className="bay__actions">
                    <button type="button" className="btn btn--primary" onClick={() => openProject(p.id)}>
                      <Icon name="file" className="btn__icon" />
                      Open file<span className="visually-hidden">: {p.title}</span>
                    </button>
                    {p.link && (
                      <a className="btn" href={p.link} target="_blank" rel="noopener noreferrer">
                        Live site<span className="visually-hidden">: {p.title} (opens in a new tab)</span>
                        <Icon name="external" className="btn__icon" />
                      </a>
                    )}
                    {p.github && (
                      <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">
                        <Icon name="github" className="btn__icon" />
                        Code<span className="visually-hidden">: {p.title} on GitHub (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <ProjectFile />
    </section>
  );
};

export default ProjectionBay;
