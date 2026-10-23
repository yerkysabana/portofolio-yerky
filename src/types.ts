export interface Project {
  id: string;
  title: string;
  category: 'web' | 'uiux' | 'mobile';
  categoryLabel: string;
  badge?: string;
  summary: string;
  description: string;
  tags: string[];
  image?: string;
  metrics: { label: string; value: string }[];
  features: string[];
  colSpan?: 1 | 2;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  period: string;
  location: string;
  role: string;
  company: string;
  description: string;
}

export interface MetricCard {
  label: string;
  value: string;
  sublabel: string;
  description: string;
  highlight?: boolean;
}

export interface ProfileInfo {
  name: string;
  title: string;
  experienceYears: string;
  projectsCompleted: string;
  clientSatisfaction?: string;
  availability: string;
  location: string;
  email: string;
  bio: string;
  secondaryBio: string;
}
