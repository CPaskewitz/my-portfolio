import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.scss';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
            isValid = false;
        }

        if (!formData.message) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                e.currentTarget,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            ).then(() => {
                alert('Form submitted successfully!');
            }).catch(() => {
                alert('An error occurred, please try again.');
            });

            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="contact" id="contact">
            <h1 className="contact__title">Contact</h1>
            <div className="contact__resume">
                <p className="contact__resume-text">Download My Resume</p>
                <a href="/Corey_Paskewitz_Resume.pdf" download>
                    <img src="/resumeicon.png" alt="Download Resume" className="contact__resume-icon" />
                </a>
            </div>
            <h2 className="contact__subtitle">Message Me</h2>
            <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="contact__error-text">{errors.name}</span>}
                </div>
                <div className="contact__form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="contact__error-text">{errors.email}</span>}
                </div>
                <div className="contact__form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? 'error' : ''}
                    ></textarea>
                    {errors.message && <span className="contact__error-text">{errors.message}</span>}
                </div>
                <button type="submit" className="contact__button">Submit</button>
            </form>
        </div>
    );
};

export default Contact;