import React from 'react';
import './About.scss';

const About: React.FC = () => {
    const skills = [
        { src: 'htmlicon.png', alt: 'HTML' },
        { src: 'cssicon.png', alt: 'CSS' },
        { src: 'javascripticon.png', alt: 'JavaScript' },
        { src: 'reacticon.png', alt: 'React' },
        { src: 'nodeicon.png', alt: 'Node.js' },
        { src: 'mysqlicon.png', alt: 'MySQL' },
        { src: 'mongodbicon.png', alt: 'MongoDB' },
        { src: 'typescripticon.png', alt: 'TypeScript' },
    ];

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
                {skills.map((skill, index) => (
                    <div key={index} className="about__skill">
                        <img src={skill.src} alt={skill.alt} className="about__skill-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;