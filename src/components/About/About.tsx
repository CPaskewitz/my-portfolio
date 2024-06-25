import React from 'react';
import './About.scss';

const About: React.FC = () => {
    return (
        <div className="about" id="about">
            <h1 className="about__title">About</h1>
            <p className="about__description">
                Starting with Unity game development, I found a passion for turning ideas into interactive experiences.
                This led me to software engineering, mastering HTML, CSS, JavaScript, React, Express, and MySQL.
                My customer service and HR background enhances my communication and teamwork skills,
                bridging gaps between technical and non-technical teams.
                I thrive on innovative projects that push technological boundaries and enhance user engagement.
                Outside of coding, I enjoy horror movies, gaming, and fitness.
            </p>
            <div className="about__skills">
                <div className="about__skill">HTML</div>
                <div className="about__skill">CSS</div>
                <div className="about__skill">JavaScript</div>
                <div className="about__skill">React</div>
                <div className="about__skill">Node.js</div>
                <div className="about__skill">MySQL</div>
                <div className="about__skill">MongoDB</div>
                <div className="about__skill">TypeScript</div>
            </div>
        </div>
    );
}

export default About;