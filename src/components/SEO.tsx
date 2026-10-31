import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Abdullah Shaban - Operations & Automation Specialist | Egypt',
  description = 'Project & Operations Coordinator with 5+ years experience in workflow automation, KPI dashboards, and operational excellence. Specializing in Google Apps Script, process optimization, and data-driven decision making.',
  image = 'https://mostafavipecoder.github.io/CV/logo.svg',
  url = 'https://mostafavipecoder.github.io/CV/',
  type = 'website',
}: SEOProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Author & Keywords */}
      <meta name="author" content="Abdullah Shaban Fouad Sayed" />
      <meta
        name="keywords"
        content="Operations Management, Workflow Automation, Google Apps Script, KPI Dashboards, Project Coordination, Process Optimization, Data Analytics, Egypt, Minya, Operations Specialist, Automation Expert"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Abdullah Shaban Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Abdullah Shaban Fouad Sayed',
          jobTitle: 'Operations & AI Solutions Specialist',
          description: description,
          url: url,
          image: image,
          email: 'abdullah.shaban165@gmail.com',
          telephone: '+20-112-049-2320',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Minya',
            addressCountry: 'Egypt',
          },
          sameAs: [
            'https://www.linkedin.com/in/abdullah-shaban-fouad/',
            'https://campushubs.org/profile/f48d0243-5944-408d-bfaa-09a238a9af0a',
          ],
          knowsAbout: [
            'Operations Management',
            'Workflow Automation',
            'Google Apps Script',
            'KPI Dashboards',
            'Project Coordination',
            'Process Optimization',
            'Data Analytics',
          ],
          alumniOf: {
            '@type': 'Organization',
            name: 'Your University', // TODO: Update with actual university
          },
          worksFor: {
            '@type': 'Organization',
            name: 'Athar Accelerator',
          },
        })}
      </script>

      {/* Structured Data - Professional Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Abdullah Shaban - Operations Consulting',
          description: 'Operations management and workflow automation consulting services',
          provider: {
            '@type': 'Person',
            name: 'Abdullah Shaban Fouad Sayed',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Egypt',
          },
          serviceType: [
            'Operations Management',
            'Workflow Automation',
            'Process Optimization',
            'KPI Dashboard Development',
          ],
        })}
      </script>
    </Helmet>
  );
}
