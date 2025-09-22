// Description: Type definitions for the Contentstack API

// PublishDetails object - Represents the details of publish functionality 
export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

// File object - Represents a file in Contentstack
export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  publish_details: PublishDetails;
  $: any;
}

// Link object - Represents a hyperlink in Contentstack
export interface Link {
  title: string;
  href: string;
}

// Taxonomy object - Represents a taxonomy in Contentstack
export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

type author_profile = {
  show_article_list: boolean,
  article_list_limit: number,  
}

export type Featured_articles = {
  article_ref:BlogPost[],
  highlight_text: string,
  background_color: string
}
export type Recent_articles = {
  title: string,
  show_author: boolean,
  show_date: boolean,
  categorie_filter:[Category],
  cta_label: string,
}

type rich_text = {
  body: string
}
export type List_of_cards = {
  section_title: string,
  view_type: ("grid" | "list"),
  cta_label: string,
}

export type NavigationItem = {
  nav_item_title: string;
  nav_item_url: {
    title: string;
    href: string;
  };
  $: any;
}

export type Header = {
  uid: string;
  title: string;
  logo?: File | null;
  navigation: NavigationItem[];
  $: any;
}

export type SocialLink = {
  icon?: File | null;
  url: string;
  $: any;
}

export type Footer = {
  uid: string;
  title: string;
  site_description: string;
  links: NavigationItem[];
  social_links: SocialLink[];
  $: any;
}


export type Pagecomponent = {
  featured_article_section?: Featured_articles,
  recent_articles_list?: Recent_articles,
  author_profile?: author_profile,
  rich_text_section?: rich_text,
  list_of_cards?: List_of_cards,
}
export interface Page {
  uid: string;
  $: any;
  _version?: number;
  title: string;
  url?: string;
  seo:Seo
  page_components?: Pagecomponent[];

}
export type Category = {
  uid: string;
  title: string;   
  description?: string;
  image?: File | null;
  $: any;
}
type ContactInfo = {
  email: string;
  phone: string;
};
export type Author = {
  uid: string;
  title: string;
  bio?: string;
  photo?: File | null;
  contact:ContactInfo
  $: any;   
}
type Seo = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
};


export type BlogPost = {
  uid: string;
  title: string; 
  summary?: string;
  content?: string;
  author?: [Author];
  published_date?: string; 
  category?: [Category];
  reading_time?: number;
  image?: File | null;
  publish_details?: {
    time: string;
  };
  $: any;
}

export type RenderProps = {
  contentTypeUid: string;
  entryUid: string;
  pageComponents:Pagecomponent[];
  author?: Author;
}