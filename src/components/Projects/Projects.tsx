import React from 'react';
import './Projects.scss';

const Projects: React.FC = () => {
    const projects = [
        {
            title: 'Project 1',
            description: 'A full stack social media application...',
            imageUrl: '',
            link: ''
        },
    ];

    return (
        <div className="projects" id="projects">
            <h1 className="projects__title">Projects</h1>
            <div className="projects__list">
                {projects.map((project, index) => (
                    <div key={index} className="projects__card">
                        <img src={project.imageUrl} alt={project.title} className="projects__image" />
                        <h2 className="projects__card-title">{project.title}</h2>
                        <p className="projects__description">{project.description}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects__link">View Project</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;