import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet-async';

interface HelmetProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    children?: React.ReactNode;
}

const Helmet: React.FC<HelmetProps> = ({
    title = 'Corey Paskewitz | Web Developer & Software Engineer',
    description = 'Portfolio of Corey Paskewitz, a web developer and software engineer specializing in React, TypeScript, and modern web technologies.',
    keywords = 'web developer, software engineer, react, typescript, portfolio',
    image = '/social-share.jpg',
    url = 'https://yourportfolio.com',
    type = 'website',
    children
}) => {
    const siteUrl = 'https://yourportfolio.com';
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <ReactHelmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* Additional meta tags */}
            <meta name="author" content="Corey Paskewitz" />
            <meta name="robots" content="index, follow" />

            {/* Allow for custom structured data or other elements */}
            {children}
        </ReactHelmet>
    );
};

export default Helmet;