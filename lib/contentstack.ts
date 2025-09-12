import contentstack, { QueryOperation,Entry  } from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { Page,BlogPost } from "./types";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string)
const endpoints = getContentstackEndpoints(region, true)

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: region ? region : process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any,
  host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || endpoints && endpoints.contentDelivery,

  live_preview: {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || endpoints && endpoints.preview
  }
});

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false,
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true', 
    mode: "builder", 
    stackSdk: stack.config as IStackSdk, 
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },
    clientUrlParams: {
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || endpoints && endpoints.application
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"]
    },
  });
}
export async function getPage(url: string) {
  const result = await stack
    .contentType("page")
    .entry()
    .includeReference([
      'page_components.featured_article_section.article_ref',
      'page_components.featured_article_section.article_ref.author',
      'page_components.featured_article_section.article_ref.category',
      'page_components.recent_articles_list.categorie_filter',
    ])
    .query() 
    .where("url", QueryOperation.EQUALS, url) 
    .find<Page>(); 

  if (result.entries) {
    const entry = result.entries[0]; 

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(entry, 'page', true); 
    }
    return entry; 
  }
}

export async function getRecentBlogPosts(categoryUid?: string, limit: number = 3) {
  console.log('Fetching recent blog posts with categoryUid:', categoryUid, 'and limit:', limit);

  let query = stack
    .contentType("blog_post")
    .entry()
    .includeReference(['author', 'category'])
    .query();

  if (categoryUid) {
    query.where('category.uid',QueryOperation.EQUALS,categoryUid); 
  }

  query.orderByDescending('published_date').limit(limit);

  const result = await query.find();
  const entries = result?.entries as BlogPost[];

  console.log('Recent blog posts result:', entries);
  console.log('Category UID filter:', categoryUid);

  if (entries?.length > 0) {
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      entries.forEach((entry: BlogPost) => {
        contentstack.Utils.addEditableTags(entry, 'blog_post', true);
      });
    }
    return entries;
  }

  return [];
}

