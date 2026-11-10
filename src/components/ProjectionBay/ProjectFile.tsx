import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/projects';
import { skillById } from '../../data/skills';
import { useCore } from '../../state/CoreContext';
import { play } from '../../lib/sound';
import Icon from '../Icon/Icon';

/**
 * The project file viewer: a native <dialog> (focus trap, Esc, inert background for free)
 * with a screenshot carousel, the long description, the stack and links.
 */
const ProjectFile: React.FC = () => {
  const { openProjectId, openProject } = useCore();
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const project = projects.find((p) => p.id === openProjectId) ?? null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      setIndex(0);
      dialog.showModal();
      play('open');
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  if (!project) return <dialog ref={ref} className="file" aria-label="Project file" />;

  const count = project.images.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <dialog
      ref={ref}
      className="file"
      aria-labelledby="file-title"
      onClose={() => {
        play('close');
        openProject(null);
      }}
      onClick={(e) => {
        // click on the backdrop (the dialog element itself) closes
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="file__panel holo-panel">
        <header className="file__head">
          <div>
            <p className="hud-label">
              <span className="file__code">{project.code}</span> // {project.kind} file
            </p>
            <h2 id="file-title" className="file__title">{project.title}</h2>
          </div>
          <button type="button" className="file__close" onClick={() => ref.current?.close()} autoFocus>
            <Icon name="close" />
            <span className="visually-hidden">Close project file</span>
          </button>
        </header>

        <div className="file__viewer">
          <div className="file__stage">
            <img
              key={project.images[index]}
              src={project.images[index]}
              alt={`${project.title}, screenshot ${index + 1} of ${count}`}
              className="file__img"
            />
          </div>
          {count > 1 && (
            <div className="file__controls">
              <button type="button" className="btn" onClick={() => go(-1)}>
                <Icon name="chevronLeft" className="btn__icon" />
                <span className="visually-hidden">Previous screenshot</span>
              </button>
              <span className="file__counter hud-label" aria-live="polite">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button type="button" className="btn" onClick={() => go(1)}>
                <Icon name="chevronRight" className="btn__icon" />
                <span className="visually-hidden">Next screenshot</span>
              </button>
            </div>
          )}
        </div>

        <div className="file__info">
          <p className="file__summary">{project.summary}</p>
          <p className="file__detail">{project.detail}</p>
          <ul className="file__tags" aria-label="Built with">
            {project.skills.map((s) => (
              <li key={s} className="chip">{skillById(s)?.name}</li>
            ))}
          </ul>
          <div className="file__links">
            {project.link && (
              <a className="btn btn--primary" href={project.link} target="_blank" rel="noopener noreferrer">
                Visit live site<span className="visually-hidden"> (opens in a new tab)</span>
                <Icon name="external" className="btn__icon" />
              </a>
            )}
            {project.github && (
              <a className="btn" href={project.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" className="btn__icon" />
                View code<span className="visually-hidden"> on GitHub (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProjectFile;
