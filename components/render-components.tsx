import React from 'react';
import { RenderProps } from '../lib/types';
import FeaturedArticleSection from './featured-article-section';
import RecentArticlesSection from './recent-articles-section';
import ArticleListWrapper from './article-list-wrapper';
import AuthorProfileSection from './author-profile-section';
import AuthorArticlesWrapper from './author-article-wrapper';
import CategoryListWrapper from './category-list-wrapper';

export default function RenderComponents(props: RenderProps) {
    const { pageComponents, entryUid, contentTypeUid, author } = props;
    console.log('page component overview:', pageComponents);
    console.log('author in RenderComponents:', author);
    
    return (
        <div
            data-pageref={entryUid}
            data-contenttype={contentTypeUid}
        >
            {pageComponents?.map((component, key: number) => {
                if (component.author_profile && author) {
                    return (
                        <div key={`author-profile-section-${key}`}>
                            <AuthorProfileSection
                                author={author}
                                authorProfileConfig={component.author_profile}
                            />
                        </div>
                    );
                }

                if (component.featured_article_section) {
                    return (
                        <FeaturedArticleSection 
                            featuredArticleSection={component.featured_article_section} 
                            key={`featured-article-${key}`} 
                        />
                    );
                } 

                if (component.recent_articles_list) {
                    return (
                        <RecentArticlesSection 
                            recentArticlesList={component.recent_articles_list} 
                            key={`recent-articles-${key}`} 
                        />
                    );
                } 
                if (component.list_of_cards) {
                    const block = component.list_of_cards;
                    const sectionTitle = block.section_title.toLowerCase();
                    console.log('Rendering list of cards for section:', sectionTitle);
                    
                    if (author && (
                        sectionTitle.includes('articles') ||
                        sectionTitle.includes('publications') ||
                        sectionTitle.includes('mes articles') ||
                        sectionTitle.includes('écrits')
                    )) {
                        return (
                            <AuthorArticlesWrapper
                                listOfCardsProps={block}
                                author={author}
                                limit={10} 
                                key={`author-articles-${key}`}
                            />
                        );
                    }
                    
                    if (sectionTitle.includes('article') || 
                        sectionTitle.includes('blog') || 
                        sectionTitle.includes('publication')) {
                        return (
                            <ArticleListWrapper
                                listOfCardsProps={block}
                                key={`article-list-${key}`}
                            />
                        );
                    }
                    
                    return (
                        <CategoryListWrapper
                            listOfCardsProps={block}
                            key={`category-list-${key}`}
                        />
                    );
                }
                
                return null;
            })}
        </div>
    );
}