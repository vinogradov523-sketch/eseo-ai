export interface NavLink {
  href: string;
  label: string;
}

export interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  badge: string | null;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  desc: string;
  items: string[];
  highlighted: boolean;
  cta: string;
  ctaLink: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export interface ComparisonRow {
  feature: string;
  eseo: boolean;
  mashaGpt: boolean;
  neiroCard: boolean;
  sellerDen: boolean;
}
