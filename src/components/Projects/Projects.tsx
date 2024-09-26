import React, { useState } from 'react';
import './Projects.scss';
import Labels from '../Labels/Labels';

const Projects: React.FC = () => {
    const projects = [
        {
            title: 'BoguStore',
            description: 'A mock e-commerce store showcasing unit testing.',
            images: [
                '/Bogustore_Home_Page.png',
                '/Bogustore_Category_Page.png',
                '/Bogustore_Sale_Page.png',
                '/Bogustore_Cart_Page.png',
                '/Bogustore_Shipping_Info.png',
                '/Bogustore_Payment_Info.png',
                '/Bogustore_Order_Summary.png',
                '/bogustore_productlist_test.png',
                '/bogustore_cart_test.png',
                '/bogustore_checkout_test.png'
            ],
            link: '',
            github: 'https://github.com/CPaskewitz/bogustore',
            skills: [
                { image: 'nextjsicon.png', name: 'Next.js'},
                { image: 'typescripticon.png', name: 'TypeScript' },
                { image: 'reduxicon.png', name: 'Redux'},
                { image: 'tailwindicon.png', name: 'Tailwind'},
                { image: 'jesticon.png', name: 'Jest'},
            ]
        },
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
            link: 'https://quest-list-rpg-5e0cf84376ef.herokuapp.com',
            github: 'https://github.com/CPaskewitz/taskmasterrpg',
            skills: [
                { image: 'mongodbicon.png', name: 'MongoDB'},
                { image: 'reacticon.png', name: 'React' },
                { image: 'typescripticon.png', name: 'TypeScript' },
                { image: 'restapiicon.png', name: 'Dall-E 3 API'},
                { image: 'herokuicon.png', name: 'Heroku' }
            ]
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
            link: '',
            github: '',
            skills: [
                { image: 'mysqlicon.png', name: 'MySQL' },
                { image: 'reacticon.png', name: 'React Native' },
                { image: 'nodeicon.png', name: 'Node.js' },
                { image: 'typescripticon.png', name: 'TypeScript' },
            ]
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
            link: 'https://leapintolessons.com',
            github: '',
            skills: [
                { image: 'wordpressicon.png', name: 'WordPress' },
                { image: 'phpicon.png', name: 'PHP' },
                { image: 'restapiicon.png', name: 'Google Maps API' }
            ]
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
                            <Labels labels={project.skills} />
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