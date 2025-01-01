import React from 'react';
import HoverSkill from '../HoverSkill/HoverSkill';
import './About.scss';

const About: React.FC = () => {
    const skills = [
        { src: 'htmlicon.png', alt: 'HTML', bgColor: '#FF5733' },
        { src: 'cssicon.png', alt: 'CSS', bgColor: '#2980B9' },
        { src: 'javascripticon.png', alt: 'JavaScript', bgColor: '#FFD700' },
        { src: 'reacticon.png', alt: 'React', bgColor: '#61DAFB' },
        { src: 'nodeicon.png', alt: 'Node.js', bgColor: '#F29111' },
        { src: 'mysqlicon.png', alt: 'MySQL', bgColor: '#68A063' },
        { src: 'mongodbicon.png', alt: 'MongoDB', bgColor: '#4DB33D' },
        { src: 'typescripticon.png', alt: 'TypeScript', bgColor: '#3178C6' },
        { src: 'wordpressicon.png', alt: 'WordPress', bgColor: '#21759B' },
        { src: 'phpicon.png', alt: 'PHP', bgColor: '#4F5B93' },
        { src: 'restapiicon.png', alt: 'Rest API', bgColor: '#FF6F61' },
        { src: 'herokuicon.png', alt: 'Heroku', bgColor: '#79589F' },
        { src: 'nextjsicon.png', alt: 'Next.js', bgColor: '#8A2BE2' },
        { src: 'reduxicon.png', alt: 'Redux', bgColor: '#FF7F50' },
        { src: 'tailwindicon.png', alt: 'Tailwind', bgColor: '#32CD32' },
        { src: 'jesticon.png', alt: 'Jest', bgColor: '#FF6347' },
    ];

    return (
        <div className="about" id="about">
            <h1 className="about__title">About</h1>
            <div className="about__description">
                <h2 className="about__greeting">Hello, World!</h2>
                <p className='about__greeting-text'>
                    I started coding games using Unity, which led me to web development. My background in customer service and HR helps me connect with people across teams.
                </p>
                <p className='about__greeting-text'>
                    Outside of coding, I enjoy horror movies, gaming, and staying active. Let’s build something together!
                </p>
            </div>
            <h2 className="about__subtitle">My Skills</h2>
            <div className="about__skills">
                {skills.map((skill, index) => (
                    <HoverSkill key={index} src={skill.src} alt={skill.alt} bgColor={skill.bgColor} />
                ))}
            </div>
        </div>
    );
}

export default About;