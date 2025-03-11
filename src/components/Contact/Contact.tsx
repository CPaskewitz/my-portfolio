import React, { useState, useCallback, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import LazyImage from '../LazyImage/LazyImage';
import './Contact.scss';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name: string;
    email: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState<FormStatus>('idle');
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const statusTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (status === 'success' || status === 'error') {
            statusTimeoutRef.current = window.setTimeout(() => {
                setStatus('idle');
            }, 5000);
        }

        return () => {
            if (statusTimeoutRef.current) {
                clearTimeout(statusTimeoutRef.current);
            }
        };
    }, [status]);

    const validateField = useCallback((name: keyof FormData, value: string): string => {
        switch (name) {
            case 'name':
                return value.trim() ? '' : 'Name is required';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email address is invalid';
                return '';
            case 'message':
                return value.trim() ? '' : 'Message is required';
            default:
                return '';
        }
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const errorMessage = validateField(name as keyof FormData, value);
            setErrors(prev => ({ ...prev, [name]: errorMessage }));
        }
    }, [validateField, touched]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setTouched(prev => ({ ...prev, [name]: true }));

        const errorMessage = validateField(name as keyof FormData, value);
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    }, [validateField]);

    const validateForm = useCallback((): boolean => {
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message)
        };

        setErrors(newErrors);
        setTouched({ name: true, email: true, message: true });

        return !Object.values(newErrors).some(error => error);
    }, [formData, validateField]);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            const firstErrorField = Object.keys(errors).find(key => errors[key as keyof FormErrors]) as keyof FormErrors;
            if (firstErrorField && formRef.current) {
                const element = formRef.current.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
                if (element) element.focus();
            }
            return;
        }

        setStatus('submitting');

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                e.currentTarget,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
            setTouched({});

            // Removed direct DOM manipulation
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');

            // Removed direct DOM manipulation
        }
    }, [validateForm, errors, formData]);

    return (
        <section className="contact" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title" className="contact__title">Contact</h2>

            <div className="contact__content">
                <div className="contact__resume">
                    <h3 className="contact__resume-title">My Resume</h3>
                    <p className="contact__resume-text">Download my resume to learn more about my experience and qualifications.</p>
                    <a
                        href="/Corey_Paskewitz_Resume.pdf"
                        download
                        className="contact__resume-link"
                        aria-label="Download my resume (PDF)"
                    >
                        <div className="contact__resume-icon-wrapper">
                            <LazyImage
                                src="/resumeicon.png"
                                alt=""
                                className="contact__resume-icon"
                            />
                            <span className="contact__resume-download-text">Download PDF</span>
                        </div>
                    </a>
                </div>

                <div className="contact__form-container">
                    <h3 className="contact__subtitle">Send Me a Message</h3>

                    <div
                        className={`contact__status-message ${status !== 'idle' ? `contact__status-message--${status}` : ''}`}
                        aria-live="polite"
                        id="form-status-message"
                        role="status"
                    >
                        {status === 'success' && 'Your message has been sent successfully! Thank you for reaching out.'}
                        {status === 'error' && 'There was an error sending your message. Please try again or contact us directly.'}
                        {status === 'submitting' && 'Sending your message...'}
                    </div>

                    <form
                        className={`contact__form ${status === 'submitting' ? 'contact__form--submitting' : ''}`}
                        onSubmit={handleSubmit}
                        noValidate
                        aria-describedby="form-status-message"
                        ref={formRef}
                    >
                        <div className="contact__form-group">
                            <label htmlFor="name-field" className="contact__label">Name</label>
                            <input
                                type="text"
                                id="name-field"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`contact__input ${errors.name && touched.name ? 'contact__input--error' : ''}`}
                                autoComplete="name"
                                aria-invalid={!!errors.name && touched.name}
                                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                                disabled={status === 'submitting'}
                                required
                            />
                            {errors.name && touched.name && (
                                <div className="contact__error-text" id="name-error" role="alert">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="email-field" className="contact__label">Email</label>
                            <input
                                type="email"
                                id="email-field"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`contact__input ${errors.email && touched.email ? 'contact__input--error' : ''}`}
                                autoComplete="email"
                                aria-invalid={!!errors.email && touched.email}
                                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                                disabled={status === 'submitting'}
                                required
                            />
                            {errors.email && touched.email && (
                                <div className="contact__error-text" id="email-error" role="alert">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="message-field" className="contact__label">Message</label>
                            <textarea
                                id="message-field"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`contact__textarea ${errors.message && touched.message ? 'contact__textarea--error' : ''}`}
                                aria-invalid={!!errors.message && touched.message}
                                aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                                disabled={status === 'submitting'}
                                required
                                rows={6}
                            ></textarea>
                            {errors.message && touched.message && (
                                <div className="contact__error-text" id="message-error" role="alert">
                                    {errors.message}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="contact__button"
                            disabled={status === 'submitting'}
                            aria-busy={status === 'submitting'}
                        >
                            {status === 'submitting' ? (
                                <>
                                    <span className="contact__button-spinner"></span>
                                    <span>Sending...</span>
                                </>
                            ) : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Contact);