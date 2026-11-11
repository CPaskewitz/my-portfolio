import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/projects';
import { skillById } from '../../data/skills';
import { useCore } from '../../state/CoreContext';
import { play } from '../../lib/sound';
import Icon from '../Icon/Icon';

/** Screenshots taller than this (height / width) are full-page captures: the frame shows their top. */
const TALL_RATIO = 2.5;

/**
 * The project file viewer: a native <dialog> (focus trap, Esc, inert background for free)
 * with a screenshot carousel, the long description, the stack and links. Pressing the
 * screenshot opens a second, full-screen <dialog> where it shows at full width and scrolls.
 */
const ProjectFile: React.FC = () => {
  const { openProjectId, openProject } = useCore();
  const ref = useRef<HTMLDialogElement>(null);
  const zoomRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [tall, setTall] = useState(false);
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

  // each screenshot in the full-size view starts at its top
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [index]);

  if (!project) return <dialog ref={ref} className="file" aria-label="Project file" />;

  const count = project.images.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);
  const src = project.images[index];
  const alt = `${project.title}, screenshot ${index + 1} of ${count}`;
  const openZoom = () => {
    zoomRef.current?.showModal();
    play('open');
  };

  return (
    <dialog
      ref={ref}
      className="file"
      aria-labelledby="file-title"
      onClose={(e) => {
        if (e.target !== e.currentTarget) return; // the full-size view closing
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
          <button
            type="button"
            className={`file__stage${tall ? ' file__stage--tall' : ''}`}
            onClick={openZoom}
          >
            <img
              key={src}
              src={src}
              alt={alt}
              className="file__img"
              onLoad={(e) => setTall(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth > TALL_RATIO)}
            />
            <span className="file__enlarge hud-label">
              <Icon name="expand" className="btn__icon" />
              View full size
            </span>
          </button>
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

        <dialog
          ref={zoomRef}
          className="zoom"
          aria-label={`${alt}, full size`}
          onClose={() => play('close')}
          onClick={(e) => {
            // a press on the empty area beside the screenshot closes the full-size view
            if (e.target === e.currentTarget || e.target === scrollRef.current) zoomRef.current?.close();
          }}
        >
          <div className="zoom__bar">
            <p className="hud-label zoom__title">
              <span className="file__code">{project.code}</span> // {project.title}
            </p>
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
            <button type="button" className="file__close" onClick={() => zoomRef.current?.close()}>
              <Icon name="close" />
              <span className="visually-hidden">Close full-size view</span>
            </button>
          </div>
          <div
            ref={scrollRef}
            className="zoom__scroll"
            tabIndex={0}
            role="region"
            aria-label="Full-size screenshot (scrolls)"
          >
            <img key={src} src={src} alt={alt} className="zoom__img" />
          </div>
        </dialog>

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
