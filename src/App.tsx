import { useEffect, useState } from 'react';
import { useSiteContent } from './data/store';
import { LangProvider, useLang } from './i18n';
import { Navbar } from './site/Navbar';
import { Hero } from './site/Hero';
import { About } from './site/About';
import { Resume } from './site/Resume';
import { Work } from './site/Work';
import { Services } from './site/Services';
import { Contact } from './site/Contact';
import { Dashboard } from './admin/Dashboard';
import { SEO } from './components/SEO';

function useIsAdminRoute() {
  const check = () => window.location.hash.startsWith('#/admin');
  const [isAdmin, setIsAdmin] = useState(check);
  useEffect(() => {
    const onHash = () => setIsAdmin(check());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return isAdmin;
}

function Site() {
  const { content } = useSiteContent();
  const { t } = useLang();
  const { profile } = content;

  return (
    <div className="min-h-screen bg-paper">
      <SEO title={`${t(profile.name)} — ${t(profile.role)}`} description={t(profile.intro)} />
      <Navbar name={t(profile.name)} />
      <main>
        <Hero profile={profile} stats={content.stats} />
        <About profile={profile} skills={content.skills} learning={content.learning} />
        <Resume experience={content.experience} education={content.education} />
        <Work projects={content.projects} />
        <Services services={content.services} testimonials={content.testimonials} />
        <Contact profile={profile} />
      </main>
    </div>
  );
}

export default function App() {
  return useIsAdminRoute() ? (
    <Dashboard />
  ) : (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
