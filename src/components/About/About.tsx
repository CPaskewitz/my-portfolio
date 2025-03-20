import React from 'react';
import HoverSkill from '../HoverSkill/HoverSkill';
import './About.scss';

const About: React.FC = () => {
   const skills = [
     { src: "htmlicon.png", alt: "HTML", bgColor: "#E34F26" }, 
     { src: "cssicon.png", alt: "CSS", bgColor: "#264DE4" },
     { src: "sassicon.png", alt: "SASS", bgColor: "#700124" }, 
     { src: "javascripticon.png", alt: "JavaScript", bgColor: "#F7DF1E" }, 
     { src: "reacticon.png", alt: "React", bgColor: "#61DAFB" }, 
     { src: "nodeicon.png", alt: "Node.js", bgColor: "#8CC84B" }, 
     { src: "mysqlicon.png", alt: "MySQL", bgColor: "#E96A09" }, 
     { src: "mongodbicon.png", alt: "MongoDB", bgColor: "#2E7D32" }, 
     { src: "typescripticon.png", alt: "TypeScript", bgColor: "#0288D1" }, 
     { src: "wordpressicon.png", alt: "WordPress", bgColor: "#00BCD4" }, 
     { src: "phpicon.png", alt: "PHP", bgColor: "#9C27B0" }, 
     { src: "restapiicon.png", alt: "Rest API", bgColor: "#FF5722" }, 
     { src: "herokuicon.png", alt: "Heroku", bgColor: "#673AB7" }, 
     { src: "vercelicon.png", alt: "Vercel", bgColor: "#262821" }, 
     { src: "nextjsicon.png", alt: "Next.js", bgColor: "#E91E63" }, 
     { src: "reduxicon.png", alt: "Redux", bgColor: "#7B1FA2" }, 
     { src: "tailwindicon.png", alt: "Tailwind", bgColor: "#009688" },
     { src: "jesticon.png", alt: "Jest", bgColor: "#D32F2F" },
   ];

    return (
        <section className="about" id="about" aria-labelledby="about-title">
            <div className="about__container">
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
            </div>
        </section>
    );
}

export default React.memo(About);