import React from 'react';
import './Projects.scss';

const Projects: React.FC = () => {
    const projects = [
        {
            title: 'QuestListRPG',
            description: 'A task manager app with RPG elements.',
            imageUrl: '',
            link: 'https://quest-list-rpg-5e0cf84376ef.herokuapp.com/'
        },
        {
            title: 'PetAdoptr',
            description: 'A mobile app for finding animals available for adoption.',
            imageUrl: '',
            link: ''
        },
    ];

    return (
        <div className="projects" id="projects">
            <h1 className="projects__title">Projects</h1>
            <div className="projects__wrapper">
                {projects.map((project, index) => (
                    <div key={index} className="projects__container">
                        <div className="projects__image-wrapper">
                            <img src={project.imageUrl} alt={project.title} className="projects__image" />
                        </div>
                        <div className="projects__info">
                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__description">{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects__link">View Project</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;