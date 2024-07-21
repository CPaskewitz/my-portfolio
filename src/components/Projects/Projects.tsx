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
        {
            title: 'Leap Into Lessons',
            description: 'A wordpress booking site for local summer swim lessons.',
            images: [
                'leapintolessons_hero.png',
                'leapintolessons_map.png',
                'leapintolessons_coaches.png',
                'leapintolessons_faq.png',
                'leapintolessons_booking.png',
            ],
            link: 'https://leapintolessons.com'
        },
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState<number[]>(projects.map(() => 0));
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    const handleNextImage = (projectIndex: number) => {
        setCurrentImageIndex(prevState => prevState.map((index, idx) =>
            idx === projectIndex ? (index + 1) % projects[projectIndex].images.length : index
        ));
    };

    const handlePrevImage = (projectIndex: number) => {
        setCurrentImageIndex(prevState => prevState.map((index, idx) =>
            idx === projectIndex ? (index - 1 + projects[projectIndex].images.length) % projects[projectIndex].images.length : index
        ));
    };

    const handleImageClick = (image: string) => {
        setEnlargedImage(image);
    };

    const handleCloseEnlargedImage = () => {
        setEnlargedImage(null);
    };

    return (
        <div className="projects" id="projects">
            <h1 className="projects__title">Projects</h1>
            <div className="projects__wrapper">
                {projects.map((project, index) => (
                    <div key={index} className={`projects__container ${index % 2 === 0 ? 'rotate-left' : 'rotate-right'}`}>
                        <div className={`projects__image-wrapper ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <img
                                src={project.images[currentImageIndex[index]]}
                                alt={project.title}
                                className="projects__image"
                                onClick={() => handleImageClick(project.images[currentImageIndex[index]])}
                            />
                            <div className="projects__nav projects__nav--prev" onClick={() => handlePrevImage(index)}>&lt;</div>
                            <div className="projects__nav projects__nav--next" onClick={() => handleNextImage(index)}>&gt;</div>
                        </div>
                        <div className={`projects__info ${index % 2 === 0 ? 'right' : 'left'}`}>
                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__description">{project.description}</p>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects__link">View Project</a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {enlargedImage && (
                <div className="projects__enlarged-image-overlay" onClick={handleCloseEnlargedImage}>
                    <img src={enlargedImage} alt="Enlarged" className="projects__enlarged-image" />
                    <span className="projects__close-enlarged-image">&times;</span>
                </div>
            )}
        </div>
    );
};

export default Projects;