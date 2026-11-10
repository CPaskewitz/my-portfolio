import React, { useCallback, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { profile, socialLinks } from '../../data/profile';
import { corvian } from '../../data/corvian';
import { play } from '../../lib/sound';
import SectionHead from '../SectionHead/SectionHead';
import ScanSeam from '../ScanSeam/ScanSeam';
import Icon from '../Icon/Icon';
import './Channel.scss';

type Field = 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const validate = (name: Field, value: string): string => {
  if (!value.trim()) return `${name[0].toUpperCase()}${name.slice(1)} is required`;
  if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) return 'Enter a valid email address';
  return '';
};

/**
 * 05 Contact: "open a channel". A terminal-styled form with real labels and inline errors
 * (EmailJS, same template as before), beside the resume export and links.
 */
const Channel: React.FC = () => {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false });
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name as Field;
      setValues((v) => ({ ...v, [name]: e.target.value }));
      if (touched[name]) setErrors((er) => ({ ...er, [name]: validate(name, e.target.value) }));
    },
    [touched]
  );

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validate(name, e.target.value) }));
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = {
      name: validate('name', values.name),
      email: validate('email', values.email),
      message: validate('message', values.message),
    };
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    const firstBad = (Object.keys(next) as Field[]).find((k) => next[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      play('transmit');
      setStatus('sent');
      setValues({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      console.error('Error sending message:', err);
      setStatus('error');
    }
  };

  const field = (name: Field, label: string, input: React.ReactNode) => (
    <div className={`channel__field ${errors[name] && touched[name] ? 'has-error' : ''}`}>
      <label htmlFor={`${name}-field`} className="channel__label">
        <span aria-hidden="true">&gt; </span>
        {label}
      </label>
      {input}
      {errors[name] && touched[name] && (
        <p className="channel__error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const aria = (name: Field) => ({
    'aria-invalid': !!(errors[name] && touched[name]),
    'aria-describedby': errors[name] && touched[name] ? `${name}-error` : undefined,
  });

  return (
    <section id="contact" className="section channel" aria-labelledby="contact-title">
      <ScanSeam code="05" label="Open a channel" />
      <div className="section__inner">
        <SectionHead
          id="contact-title"
          code="05"
          eyebrow="Open a channel"
          title="Let's talk"
          lede={<p>Hiring, a project, or just a question. Messages come straight to me.</p>}
        />

        <div className="channel__grid">
          <form ref={formRef} className="channel__form holo-panel reveal" onSubmit={onSubmit} noValidate aria-describedby="channel-status">
            <p className="channel__term hud-label" aria-hidden="true">
              core@cpaskewitz:~$ <span>compose --to corey</span>
            </p>
            {field(
              'name',
              'Name',
              <input id="name-field" name="name" type="text" autoComplete="name" required value={values.name} onChange={onChange} onBlur={onBlur} disabled={status === 'sending'} className="channel__input" {...aria('name')} />
            )}
            {field(
              'email',
              'Email',
              <input id="email-field" name="email" type="email" autoComplete="email" required value={values.email} onChange={onChange} onBlur={onBlur} disabled={status === 'sending'} className="channel__input" {...aria('email')} />
            )}
            {field(
              'message',
              'Message',
              <textarea id="message-field" name="message" rows={6} required value={values.message} onChange={onChange} onBlur={onBlur} disabled={status === 'sending'} className="channel__input channel__textarea" {...aria('message')} />
            )}

            <div className="channel__submit">
              <button type="submit" className="btn btn--primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                <Icon name="send" className="btn__icon" />
                {status === 'sending' ? 'Transmitting…' : 'Transmit'}
              </button>
              <p id="channel-status" className={`channel__status channel__status--${status}`} role="status">
                {status === 'sending' && 'Transmitting your message…'}
                {status === 'sent' && (
                  <>
                    <Icon name="signal" size={16} /> Transmission received. I'll reply soon.
                  </>
                )}
                {status === 'error' && 'Transmission failed. Please try again, or reach me on LinkedIn.'}
              </p>
            </div>
          </form>

          <aside className="channel__side" aria-label="Resume and links">
            <div className="channel__export holo-panel reveal">
              <p className="hud-label">Export // Dossier</p>
              <h3 className="channel__side-title">Resume</h3>
              <p className="channel__side-text">Experience, skills and education on one page.</p>
              <a href={profile.resume} download className="btn btn--primary channel__cv">
                <Icon name="download" className="btn__icon" />
                Download PDF
              </a>
            </div>

            <ul className="channel__links">
              {socialLinks
                .filter((l) => l.id !== 'resume')
                .map((l) => (
                  <li key={l.id}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="channel__link">
                      <Icon name={l.id === 'github' ? 'github' : 'linkedin'} />
                      <span>{l.label}</span>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                      <Icon name="external" size={16} className="channel__link-ext" />
                    </a>
                  </li>
                ))}
              <li>
                <a href={corvian.contactUrl} target="_blank" rel="noopener noreferrer" className="channel__link">
                  <img src={corvian.mark} alt="" width={20} height={20} loading="lazy" />
                  <span>Hire the studio</span>
                  <span className="visually-hidden"> at Corvian Labs (opens in a new tab)</span>
                  <Icon name="external" size={16} className="channel__link-ext" />
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Channel;
