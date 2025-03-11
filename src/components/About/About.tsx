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
        <section className="about" id="about" aria-labelledby="about-title">
            <h2 id="about-title" className="about__title">About</h2>

            <div className="about__description">
                <h3 className="about__greeting">Hello, World!</h3>
                <p className='about__greeting-text'>
                    I began by creating interactive experiences in Unity, which led me to web development. Now, I design and build engaging websites from concept to deployment, focusing on a smooth user experience. My background in customer service and HR helps me communicate effectively and collaborate across teams.
                </p>
                <p className='about__greeting-text'>
                    I'd love to apply my expertise to your next project and help make it a success.
                </p>
            </div>

            <h3 id="skills-title" className="about__subtitle">My Skills</h3>

            <ul className="about__skills" aria-labelledby="skills-title">
                {skills.map((skill, index) => (
                    <li key={index} className="about__skill-item">
                        <HoverSkill
                            src={skill.src}
                            alt={skill.alt}
                            bgColor={skill.bgColor}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default React.memo(About);