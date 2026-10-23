export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  architecture: string[];
  features: string[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'Shipped' | 'Active Development' | 'Beta';
}

export interface LoreItem {
  id: string;
  badge: 'play' | 'life' | 'build';
  title: string;
  subtitle: string;
  story: string;
  highlights: string[];
  date: string;
}

export type ModalView = 'none' | 'about' | 'lore' | 'contact' | 'project';
