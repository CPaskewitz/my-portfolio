import React from 'react';
import HoverSkill from '../HoverSkill/HoverSkill';
import './About.scss';

const About: React.FC = () => {
    const leftSkills = [
        { src: 'htmlicon.png', alt: 'HTML', bgColor: '#FF5733' },
        { src: 'cssicon.png', alt: 'CSS', bgColor: '#2980B9' },
        { src: 'javascripticon.png', alt: 'JavaScript', bgColor: '#F1C40F' },
        { src: 'reacticon.png', alt: 'React', bgColor: '#61DAFB' },
    ];

    const rightSkills = [
        { src: 'nodeicon.png', alt: 'Node.js', bgColor: '#68A063' },
        { src: 'mysqlicon.png', alt: 'MySQL', bgColor: '#F29111' },
        { src: 'mongodbicon.png', alt: 'MongoDB', bgColor: '#4DB33D' },
        { src: 'typescripticon.png', alt: 'TypeScript', bgColor: '#3178C6' },
    ];

    return (
        <div className="about" id="about">
            <h1 className="about__title">About</h1>
            <div className="about__content">
                <div className="about__skills about__skills--left">
                    {leftSkills.map((skill, index) => (
                        <HoverSkill key={index} src={skill.src} alt={skill.alt} bgColor={skill.bgColor} />
                    ))}
                </div>
                <div className="about__description">
                    <p>
                        Starting with Unity game development, I found a passion for turning ideas into interactive experiences.
                        This led me to software engineering, mastering HTML, CSS, JavaScript, React, Express, and MySQL.
                        My customer service and HR background enhances my communication and teamwork skills,
                        bridging gaps between technical and non-technical teams.
                        I thrive on innovative projects that push technological boundaries and enhance user engagement.
                        Outside of coding, I enjoy horror movies, gaming, and fitness.
                    </p>
                </div>
                <div className="about__skills about__skills--right">
                    {rightSkills.map((skill, index) => (
                        <HoverSkill key={index} src={skill.src} alt={skill.alt} bgColor={skill.bgColor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;