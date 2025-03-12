const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Corey Paskewitz | Web Developer & Software Engineer",
    "description": "Portfolio of Corey Paskewitz, a web developer and software engineer specializing in React, TypeScript, and modern web technologies.",
    "url": "https://www.cpaskewitz.com",
    "primaryImageOfPage": {
        "@type": "ImageObject",
        "contentUrl": "https://www.cpaskewitz.com/myImage.png",
        "caption": "Corey Paskewitz - Web Developer"
    },
    "mainEntity": {
        "@type": "Person",
        "name": "Corey Paskewitz",
        "url": "https://www.cpaskewitz.com",
        "jobTitle": "Web Developer & Software Engineer",
        "knowsAbout": [
            "React",
            "TypeScript",
            "Next.js",
            "Redux",
            "Tailwind CSS",
            "Node.js",
            "MongoDB",
            "MySQL",
            "WordPress",
            "PHP",
            "RESTful APIs",
            "Jest",
            "React Native",
            "Heroku"
        ],
        "image": "https://www.cpaskewitz.com/myImage.png",
        "sameAs": [
            "https://github.com/CPaskewitz",
            "https://www.linkedin.com/in/corey-paskewitz"
        ],
        "makesOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom web development services using modern technologies like React, TypeScript, and more."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Development",
                    "description": "Development of online stores and e-commerce solutions."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Creation of mobile applications using React Native."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "WordPress Development",
                    "description": "Custom WordPress websites and themes."
                }
            }
        ],
        "workExample": [
            {
                "@type": "CreativeWork",
                "name": "BoguStore",
                "description": "A mock e-commerce store showcasing unit testing.",
                "url": "https://github.com/CPaskewitz/bogustore",
                "technicalPlatform": ["Next.js", "TypeScript", "Redux", "Tailwind", "Jest"]
            },
            {
                "@type": "CreativeWork",
                "name": "QuestListRPG",
                "description": "A task manager app with RPG elements.",
                "url": "https://github.com/CPaskewitz/taskmasterrpg",
                "technicalPlatform": ["MongoDB", "React", "TypeScript", "Dall-E 3 API", "Heroku"]
            },
            {
                "@type": "CreativeWork",
                "name": "PetAdoptr",
                "description": "A mobile app for finding animals available for adoption.",
                "technicalPlatform": ["MySQL", "React Native", "Node.js", "TypeScript"]
            },
            {
                "@type": "CreativeWork",
                "name": "Leap Into Lessons",
                "description": "A WordPress booking site for local summer swim lessons.",
                "url": "https://leapintolessons.com",
                "technicalPlatform": ["WordPress", "PHP", "Google Maps API"]
            }
        ]
    }
};

export default structuredData;