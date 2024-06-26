import React, { useState } from 'react';
import './Projects.scss';

const Projects: React.FC = () => {
    const projects = [
        {
            title: 'QuestListRPG',
            description: 'A task manager app with RPG elements.',
            images: [
                '/QuestListRPG_Home_Page.png',
                '/QuestListRPG_Login.png',
                '/QuestListRPG_Levelup.png',
                '/QuestListRPG_Shop.png',
                '/QuestListRPG_Stats.png',
            ],
            link: 'https://quest-list-rpg-5e0cf84376ef.herokuapp.com'
        },
        {
            title: 'PetAdoptr',
            description: 'A mobile app for finding animals available for adoption.',
            images: [
                '/PetAdoptr_Grid_Page.jpeg',
                '/PetAdoptr_Pet_Profile.jpeg',
                '/PetAdoptr_DM.jpeg',
                '/PetAdoptr_LM.jpeg',
                '/PetAdoptr_Web_Sockets.jpeg',
                '/PetAdoptr_Knex.jpeg',
            ],
            link: ''
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState<string[]>([]);

    const openModal = (images: string[]) => {
        setCurrentImages(images);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImages([]);
    };

    return (
        <div className="projects" id="projects">
            <h1 className="projects__title">Projects</h1>
            <div className="projects__wrapper">
                {projects.map((project, index) => (
                    <div key={index} className="projects__container">
                        <div className="projects__image-wrapper" onClick={() => openModal(project.images)}>
                            <img src={project.images[0]} alt={project.title} className="projects__image" />
                        </div>
                        <div className="projects__info">
                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__description">{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects__link">View Project</a>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="projects__modal">
                    <div className="projects__modal-content">
                        <span className="projects__modal-close" onClick={closeModal}>&times;</span>
                        <div className="projects__modal-images">
                            {currentImages.map((image, index) => (
                                <img key={index} src={image} alt={`Project Image ${index + 1}`} className="projects__modal-image" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;