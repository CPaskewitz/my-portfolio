import React, { useState, useCallback, useEffect, useRef } from 'react';
import './Projects.scss';
import Labels from '../Labels/Labels';
import LazyImage from '../LazyImage/LazyImage';

interface Skill {
    image: string;
    name: string;
}

interface Project {
    title: string;
    description: string;
    images: string[];
    link: string;
    github: string;
    skills: Skill[];
}

const Projects: React.FC = () => {
    const projects: Project[] = [
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
                { image: 'nextjsicon.png', name: 'Next.js' },
                { image: 'typescripticon.png', name: 'TypeScript' },
                { image: 'reduxicon.png', name: 'Redux' },
                { image: 'tailwindicon.png', name: 'Tailwind' },
                { image: 'jesticon.png', name: 'Jest' },
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
            link: '',
            github: 'https://github.com/CPaskewitz/taskmasterrpg',
            skills: [
                { image: 'mongodbicon.png', name: 'MongoDB' },
                { image: 'reacticon.png', name: 'React' },
                { image: 'typescripticon.png', name: 'TypeScript' },
                { image: 'restapiicon.png', name: 'Dall-E 3 API' },
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
    const [enlargedImageAlt, setEnlargedImageAlt] = useState<string>('');
    const [isPreloading, setIsPreloading] = useState<boolean[]>(projects.map(() => false));
    const modalRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        projects.forEach((project, projectIndex) => {
            if (project.images.length > 1 && !isPreloading[projectIndex]) {
                const nextImageIndex = (currentImageIndex[projectIndex] + 1) % project.images.length;
                const img = new Image();
                img.src = project.images[nextImageIndex];
            }
        });
    }, [currentImageIndex, projects, isPreloading]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (enlargedImage) {
                if (e.key === 'Escape') {
                    handleCloseEnlargedImage();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enlargedImage]);

    useEffect(() => {
        if (enlargedImage) {
            lastFocusedElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = 'hidden';
            if (modalRef.current) {
                modalRef.current.focus();
            }
        } else {
            document.body.style.overflow = '';
            if (lastFocusedElement.current) {
                lastFocusedElement.current.focus();
            }
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [enlargedImage]);

    const handleNextImage = useCallback((projectIndex: number) => {
        setIsPreloading(prev => {
            const updated = [...prev];
            updated[projectIndex] = true;
            return updated;
        });

        setCurrentImageIndex(prevState => prevState.map((index, idx) =>
            idx === projectIndex ? (index + 1) % projects[projectIndex].images.length : index
        ));

        setTimeout(() => {
            setIsPreloading(prev => {
                const updated = [...prev];
                updated[projectIndex] = false;
                return updated;
            });
        }, 300);
    }, [projects]);

    const handlePrevImage = useCallback((projectIndex: number) => {
        setIsPreloading(prev => {
            const updated = [...prev];
            updated[projectIndex] = true;
            return updated;
        });

        setCurrentImageIndex(prevState => prevState.map((index, idx) =>
            idx === projectIndex ? (index - 1 + projects[projectIndex].images.length) % projects[projectIndex].images.length : index
        ));

        setTimeout(() => {
            setIsPreloading(prev => {
                const updated = [...prev];
                updated[projectIndex] = false;
                return updated;
            });
        }, 300);
    }, [projects]);

    const handleImageClick = useCallback((image: string, alt: string) => {
        setEnlargedImage(image);
        setEnlargedImageAlt(alt);
    }, []);

    const handleCloseEnlargedImage = useCallback(() => {
        setEnlargedImage(null);
    }, []);

    const handleKeyboardNavigation = useCallback((e: React.KeyboardEvent, projectIndex: number) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            handleNextImage(projectIndex);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handlePrevImage(projectIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const currentImage = projects[projectIndex].images[currentImageIndex[projectIndex]];
            handleImageClick(currentImage, `${projects[projectIndex].title} screenshot ${currentImageIndex[projectIndex] + 1}`);
        }
    }, [handleNextImage, handlePrevImage, handleImageClick, projects, currentImageIndex]);

    return (
        <section className="projects" id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title" className="projects__title">Projects</h2>
            <div className="projects__wrapper">
                {projects.map((project, index) => (
                    <article
                        key={index}
                        className={`projects__container ${index % 2 === 0 ? 'rotate-left' : 'rotate-right'}`}
                    >
                        <div
                            className={`projects__image-wrapper ${index % 2 === 0 ? 'left' : 'right'}`}
                            onKeyDown={(e) => handleKeyboardNavigation(e, index)}
                            tabIndex={0}
                            role="region"
                            aria-label={`${project.title} image gallery. Use arrow keys to navigate`}
                        >
                            <div className={`projects__image-container ${isPreloading[index] ? 'is-preloading' : ''}`}>
                                <LazyImage
                                    src={project.images[currentImageIndex[index]]}
                                    alt={`${project.title} screenshot ${currentImageIndex[index] + 1}`}
                                    className="projects__image"
                                    onClick={() => handleImageClick(
                                        project.images[currentImageIndex[index]],
                                        `${project.title} screenshot ${currentImageIndex[index] + 1}`
                                    )}
                                />
                            </div>

                            <div className="projects__image-counter" aria-live="polite">
                                {currentImageIndex[index] + 1}/{project.images.length}
                            </div>

                            <button
                                className="projects__nav projects__nav--prev"
                                onClick={() => handlePrevImage(index)}
                                aria-label="Previous image"
                                type="button"
                            >
                                <span aria-hidden="true">&lt;</span>
                            </button>

                            <button
                                className="projects__nav projects__nav--next"
                                onClick={() => handleNextImage(index)}
                                aria-label="Next image"
                                type="button"
                            >
                                <span aria-hidden="true">&gt;</span>
                            </button>
                        </div>

                        <div className={`projects__info ${index % 2 === 0 ? 'right' : 'left'}`}>
                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__description">{project.description}</p>
                            <div className="projects__links">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="projects__link"
                                        aria-label={`Visit ${project.title} website`}
                                    >
                                        View Project
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="projects__github-link"
                                        aria-label={`View ${project.title} GitHub repository`}
                                    >
                                        View on Github
                                    </a>
                                )}
                            </div>
                            <div className="projects__skills">
                                <h4 className="projects__skills-title">Technologies</h4>
                                <Labels labels={project.skills} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {enlargedImage && (
                <div
                    className="projects__enlarged-image-overlay"
                    onClick={handleCloseEnlargedImage}
                    ref={modalRef}
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                >
                    <div className="projects__enlarged-image-container">
                        <img
                            src={enlargedImage}
                            alt={enlargedImageAlt}
                            className="projects__enlarged-image"
                        />
                        <button
                            className="projects__close-enlarged-image"
                            onClick={handleCloseEnlargedImage}
                            aria-label="Close preview"
                            type="button"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default React.memo(Projects);