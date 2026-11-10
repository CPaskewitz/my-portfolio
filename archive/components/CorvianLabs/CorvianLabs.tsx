import React from 'react';
import LazyImage from '../LazyImage/LazyImage';
import './CorvianLabs.scss';

const services = [
  {
    title: 'Website Design & Development',
    text: 'Custom, mobile-first sites with on-page SEO, WCAG 2.1 AA accessibility targets, and performance budgets from day one. Built for sole proprietors, new businesses, and anyone replacing a DIY builder.',
    href: 'https://corvianlabs.com/services#websites',
  },
  {
    title: 'Custom Web Apps & Software',
    text: 'Full-stack applications with authentication and roles, booking and scheduling logic, customer dashboards, admin panels, and email automation. For businesses that need portals, booking systems, or internal tools.',
    href: 'https://corvianlabs.com/services#web-apps',
  },
  {
    title: 'Consulting & Technical Audits',
    text: 'Performance, accessibility, and technical SEO audits with plain-language reports and prioritized fixes. Code reviews, legacy and WordPress migrations, and hourly development on existing codebases.',
    href: 'https://corvianlabs.com/services#consulting',
  },
  {
    title: 'Maintenance & Care Plans',
    text: 'Predictable monthly support covering dependency updates, hosting and domain management, uptime monitoring, backups, and a block of edit and development hours.',
    href: 'https://corvianlabs.com/services#care-plans',
  },
];

const principles = [
  {
    heading: 'Understand the Problem First',
    text: 'Every project starts with the real business problem, then the simplest tool that solves it well',
  },
  {
    heading: 'Fixed Quotes, No Scope Creep',
    text: 'Clear pricing agreed up front, with no surprises along the way',
  },
  {
    heading: 'You Own Everything',
    text: 'Full ownership of code, content, domains, and accounts, with documentation and hand-off',
  },
  {
    heading: 'Built to Last',
    text: 'Maintainable code, a 30-day post-launch fix period, and support that continues after launch',
  },
];

const CorvianLabs: React.FC = () => {
  return (
    <section className="corvian-labs" id="corvian-labs" aria-labelledby="corvian-labs-title">
      <div className="corvian-labs__container">
        <h2 id="corvian-labs-title" className="corvian-labs__title">Corvian Labs</h2>

        <div className="corvian-labs__content">
          <div className="corvian-labs__logo-container">
            <LazyImage
              src="/corvianlabs_logo.png"
              alt="Corvian Labs Logo"
              className="corvian-labs__logo"
            />
          </div>

          <div className="corvian-labs__description">
            <h3 className="corvian-labs__tagline">Websites and web apps that help Ontario businesses ship</h3>

            <p className="corvian-labs__text">
              Corvian Labs is my web design and development studio based in Cambridge, Ontario. I design, build, and maintain fast, accessible websites and custom web applications for businesses across Kitchener-Waterloo, Guelph, and remote clients in Canada and the US.
            </p>

            <p className="corvian-labs__text">
              The studio started as a product company, where I designed and launched my own software, including an AI email-outreach platform and a journaling app that is live on the App Store today. When local businesses began asking for help with their websites, that client work became the most fulfilling part of the job, so it became the focus. The name comes from the crow, an animal known for intelligence, adaptability, and problem-solving.
            </p>
          </div>

          <div className="corvian-labs__product">
            <h3 className="corvian-labs__product-title">Services</h3>

            <div className="corvian-labs__product-content">
              <div className="corvian-labs__product-info">
                <div className="corvian-labs__services-grid">
                  {services.map((service) => (
                    <a
                      key={service.title}
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="corvian-labs__service-card"
                    >
                      <h4 className="corvian-labs__service-heading">{service.title}</h4>
                      <p className="corvian-labs__service-text">{service.text}</p>
                    </a>
                  ))}
                </div>

                <div className="corvian-labs__features">
                  <h4 className="corvian-labs__features-title">How Projects Run</h4>
                  <ul className="corvian-labs__features-list corvian-labs__features-list--inline">
                    <li>Discover</li>
                    <li>Design</li>
                    <li>Build</li>
                    <li>Launch</li>
                    <li>Support</li>
                  </ul>
                </div>

                <p className="corvian-labs__text corvian-labs__text--highlight">
                  Recent work includes Leap Into Lessons, a swim lesson booking platform, and the Ontario Animal Welfare Network, a non-profit member directory. Both are featured in the Projects section above.
                </p>

                <div className="corvian-labs__cta">
                  <a
                    href="https://corvianlabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corvian-labs__link corvian-labs__link--primary"
                    aria-label="Visit Corvian Labs website"
                  >
                    Visit Corvian Labs
                  </a>
                  <a
                    href="https://corvianlabs.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corvian-labs__link corvian-labs__link--secondary"
                    aria-label="Start a project with Corvian Labs"
                  >
                    Start a Project
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="corvian-labs__values">
            <h3 className="corvian-labs__values-title">How I Work</h3>
            <div className="corvian-labs__values-grid">
              {principles.map((principle) => (
                <div key={principle.heading} className="corvian-labs__value-card">
                  <h4 className="corvian-labs__value-heading">{principle.heading}</h4>
                  <p className="corvian-labs__value-text">{principle.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CorvianLabs);
