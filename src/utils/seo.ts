export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const defaultSEO: SEOData = {
  title: 'Kiran Garud - Professional DevOps Engineer | AI-Powered Cloud Infrastructure',
  description: 'Professional DevOps Engineer specializing in AI-powered cloud infrastructure, automation, and scalable solutions. AWS certified with 20+ real-world projects delivered.',
  keywords: 'DevOps Engineer, Cloud Infrastructure, AWS, Terraform, Docker, Kubernetes, CI/CD, Automation, AI Integration',
  ogImage: 'https://kirangarudofficial.com/og-image.jpg',
  canonicalUrl: 'https://kirangarudofficial.com'
};

export const updatePageSEO = (seoData: Partial<SEOData>) => {
  const data = { ...defaultSEO, ...seoData };
  
  // Update title
  document.title = data.title;
  
  // Update meta description
  updateMetaTag('description', data.description);
  
  // Update keywords
  if (data.keywords) {
    updateMetaTag('keywords', data.keywords);
  }
  
  // Update Open Graph tags
  updateMetaTag('og:title', data.title, 'property');
  updateMetaTag('og:description', data.description, 'property');
  
  if (data.ogImage) {
    updateMetaTag('og:image', data.ogImage, 'property');
  }
  
  if (data.canonicalUrl) {
    updateMetaTag('og:url', data.canonicalUrl, 'property');
    updateCanonicalUrl(data.canonicalUrl);
  }
  
  // Update Twitter Card tags
  updateMetaTag('twitter:title', data.title);
  updateMetaTag('twitter:description', data.description);
  
  if (data.ogImage) {
    updateMetaTag('twitter:image', data.ogImage);
  }
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

const updateCanonicalUrl = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  
  element.href = url;
};

// Structured data helpers
export const generatePersonStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kiran Garud",
    "jobTitle": "DevOps Engineer",
    "description": "Professional DevOps Engineer specializing in AI-powered cloud infrastructure and automation",
    "url": "https://kirangarudofficial.com",
    "sameAs": [
      "https://github.com/kirangarudofficial",
      "https://linkedin.com/in/kirangarudofficial"
    ],
    "knowsAbout": [
      "DevOps",
      "Cloud Computing",
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Infrastructure as Code",
      "Automation"
    ]
  };
};

export const generateWebsiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kiran Garud Portfolio",
    "url": "https://kirangarudofficial.com",
    "description": "Professional DevOps Engineer portfolio showcasing AI-powered cloud infrastructure solutions",
    "author": {
      "@type": "Person",
      "name": "Kiran Garud"
    }
  };
};