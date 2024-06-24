import React from 'react';
import './Contact.scss';

const Contact: React.FC = () => {
    return (
        <div className="contact" id="contact">
            <h1 className="contact__title">Contact</h1>
            <form className="contact__form">
                <label className="contact__label">Name:</label>
                <input type="text" className="contact__input" />

                <label className="contact__label">Email:</label>
                <input type="email" className="contact__input" />

                <label className="contact__label">Message:</label>
                <textarea className="contact__textarea" />

                <button type="submit" className="contact__button">Submit</button>
            </form>
        </div>
    );
}

export default Contact;