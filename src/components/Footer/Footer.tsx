import React, { useEffect } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import './Footer.scss';

interface SocialLink {
    name: string;
    url: string;
    icon: string;
    label: string;
}

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks: SocialLink[] = [
        {
            name: 'GitHub',
            url: 'https://github.com/CPaskewitz',
            icon: '/githubicon.png',
            label: 'Visit my GitHub profile'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/corey-paskewitz',
            icon: '/linkedinicon.png',
            label: 'Connect with me on LinkedIn'
        }
    ];

    // Add structured data to the page
    useEffect(() => {
        // This injects the structured data for the organization
        // You only need to do this once on the site, so the footer is a good place
        // This is a global schema that applies to the whole site
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Corey Paskewitz Web Development",
            "url": "https://yourportfolio.com",
            "logo": "https://yourportfolio.com/logo.png",
            "sameAs": socialLinks.map(link => link.url),
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "your.email@example.com"
            }
        };

        // Check if the script already exists to avoid duplicates
        const existingScript = document.getElementById('organization-schema');
        if (!existingScript) {
            const script = document.createElement('script');
            script.id = 'organization-schema';
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(organizationSchema);
            document.head.appendChild(script);
        }

        // Clean up on unmount
        return () => {
            const script = document.getElementById('organization-schema');
            if (script) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer" role="contentinfo">
            <div className="footer__container">
                <div className="footer__top">
                    <div className="footer__connect">
                        <h2 className="footer__title">Connect With Me</h2>
                        <ul className="footer__social-links">
                            {socialLinks.map((link) => (
                                <li key={link.name} className="footer__social-item">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer__social-link"
                                        aria-label={link.label}
                                    >
                                        <div className="footer__icon-wrapper">
                                            <LazyImage
                                                src={link.icon}
                                                alt=""
                                                className="footer__icon icon-image"
                                                width={50}
                                                height={50}
                                            />
                                            <span className="footer__icon-name">{link.name}</span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__navigation">
                        <h2 className="footer__title">Navigation</h2>
                        <nav aria-label="Footer navigation">
                            <ul className="footer__nav-links">
                                <li><a href="#about" className="footer__nav-link">About</a></li>
                                <li><a href="#projects" className="footer__nav-link">Projects</a></li>
                                <li><a href="#contact" className="footer__nav-link">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        &copy; {currentYear} Corey Paskewitz. All rights reserved.
                    </p>

                    <button
                        className="footer__back-to-top"
                        onClick={scrollToTop}
                        aria-label="Scroll to top of page"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="footer__arrow-icon"
                        >
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                        <span>Back to Top</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);