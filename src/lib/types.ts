export type UserRole = 'admin' | 'team_tech' | 'team_business' | 'external';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  role: UserRole;
  approved: boolean;
  organization: string | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  sector: string | null;
  status: 'completed' | 'in-progress' | 'planned';
  version: string | null;
  architecture_description: string | null;
  tech_stack: string[];
  features: string[];
  highlights: string[];
  repo_url: string | null;
  demo_url: string | null;
  pitch_content: string | null;
  factsheet_content: string | null;
  ai_system_prompt: string | null;
  icon_url: string | null;
  sort_order: number;
}

export interface ProductAccess {
  id: string;
  user_id: string;
  product_id: string;
  access_level: 'view' | 'demo' | 'full';
  granted_at: string;
  expires_at: string | null;
}
