import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const MetaTags = ({
  title = 'Professional Portfolio | Modern Developer',
  description = 'Professional portfolio website showcasing projects, skills, and services with a modern black theme and interactive animations.',
  keywords = 'portfolio, developer, web development, projects, skills, 3D animations, black theme, glassmorphism',
  image = '/assets/og-image.jpg',
  url = 'https://your-portfolio-url.com',
}: MetaTagsProps) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Theme color for browser */}
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
};
