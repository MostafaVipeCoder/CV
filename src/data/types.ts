export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];

/** A piece of text written in both site languages */
export type Text = Record<Lang, string>;
export type TextList = Record<Lang, string[]>;

export interface Profile {
  name: Text;
  role: Text;
  /** Headline; wrap the key phrase in [brackets] to highlight it */
  headline: Text;
  intro: Text;
  about: TextList;
  philosophy: Text;
  location: Text;
  availability: Text;
  photo: string;
  email: string;
  phone: string;
  linkedin: string;
  cvUrl: string;
}

export interface Stat {
  id: string;
  value: Text;
  label: Text;
}

export interface Experience {
  id: string;
  role: Text;
  org: Text;
  period: Text;
  points: TextList;
  tags: TextList;
}

export const EDUCATION_KINDS = ['degree', 'course', 'certificate'] as const;

export interface Education {
  id: string;
  kind: (typeof EDUCATION_KINDS)[number];
  title: Text;
  org: Text;
  period: Text;
  note: Text;
  url: string;
}

export interface SkillGroup {
  id: string;
  title: Text;
  skills: TextList;
}

export interface Project {
  id: string;
  title: Text;
  problem: Text;
  solution: Text;
  result: Text;
  tags: TextList;
  image: string;
  url: string;
}

export const SERVICE_ICONS = ['lightbulb', 'workflow', 'bar-chart', 'graduation-cap', 'compass', 'layers'] as const;
export type ServiceIcon = (typeof SERVICE_ICONS)[number];

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: Text;
  summary: Text;
  forWho: Text;
  deliverables: TextList;
  duration: Text;
}

export interface Testimonial {
  id: string;
  quote: Text;
  name: Text;
  role: Text;
}

export interface LearningItem {
  id: string;
  topic: Text;
  note: Text;
}

export interface SiteContent {
  /** Bumped when the shape changes so stale saved drafts are ignored */
  version: 2;
  profile: Profile;
  stats: Stat[];
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  learning: LearningItem[];
}
