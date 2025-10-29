import React from 'react';
import LazyImage from '../LazyImage/LazyImage';
import './CorvianLabs.scss';

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
            <h3 className="corvian-labs__tagline">Building Smart, Accessible SaaS Tools for Small Businesses</h3>

            <p className="corvian-labs__text">
              Corvian Labs is my venture into developing intelligent SaaS solutions that democratize enterprise-level tools for small business owners, freelancers, and agencies. Named after the crow, our approach values adaptability, problem-solving, and innovation in every tool we build.
            </p>

            <p className="corvian-labs__text">
              We believe small businesses face the same challenges as large enterprises but rarely have access to the same caliber of tools. Our mission is to change that through workflow automation, AI-powered features, and intuitive design that works out-of-the-box.
            </p>
          </div>

          <div className="corvian-labs__product">
            <h3 className="corvian-labs__product-title">Featured Product: ThawMail</h3>

            <div className="corvian-labs__product-content">
              <div className="corvian-labs__product-info">
                <p className="corvian-labs__text">
                  ThawMail is an AI-driven platform that revolutionizes cold email outreach. It analyzes target websites to understand business needs and technology infrastructure, then generates customized, personalized emails based on prospect-specific insights.
                </p>

                <div className="corvian-labs__features">
                  <h4 className="corvian-labs__features-title">Key Features:</h4>
                  <ul className="corvian-labs__features-list">
                    <li>AI-powered website and business analysis</li>
                    <li>Automated prospect research that saves hours</li>
                    <li>Personalized email generation that sounds authentic</li>
                    <li>Smart pricing configuration and recommendations</li>
                    <li>Copy-and-send workflow through your preferred platform</li>
                  </ul>
                </div>

                <p className="corvian-labs__text corvian-labs__text--highlight">
                  Perfect for web developers, design agencies, marketing consultants, and freelancers looking to scale their client acquisition without expanding headcount.
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
                    href="https://corvianlabs.com/thawmail"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="corvian-labs__link corvian-labs__link--secondary"
                    aria-label="Learn more about ThawMail"
                  >
                    Learn About ThawMail
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="corvian-labs__values">
            <h3 className="corvian-labs__values-title">Core Principles</h3>
            <div className="corvian-labs__values-grid">
              <div className="corvian-labs__value-card">
                <h4 className="corvian-labs__value-heading">Customer First</h4>
                <p className="corvian-labs__value-text">Features begin with understanding real business problems</p>
              </div>
              <div className="corvian-labs__value-card">
                <h4 className="corvian-labs__value-heading">Quality Over Speed</h4>
                <p className="corvian-labs__value-text">Shipping when ready, not when rushed</p>
              </div>
              <div className="corvian-labs__value-card">
                <h4 className="corvian-labs__value-heading">Transparency</h4>
                <p className="corvian-labs__value-text">Honest pricing and communication without hidden costs</p>
              </div>
              <div className="corvian-labs__value-card">
                <h4 className="corvian-labs__value-heading">Continuous Improvement</h4>
                <p className="corvian-labs__value-text">Rapid iteration based on user feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CorvianLabs);
