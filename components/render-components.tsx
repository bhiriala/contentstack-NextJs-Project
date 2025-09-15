import React from 'react';
import { RenderProps } from '../lib/types';
import FeaturedArticleSection from './featured-article-section';
import RecentArticlesSection from './recent-articles-section';
import ListOfCards from './list-of-cards-section';

export default function RenderComponents(props: RenderProps) {
    const { pageComponents, entryUid, contentTypeUid } = props;
    console.log('page component overview:', pageComponents);
    
    return (
        <div
            data-pageref={entryUid}
            data-contenttype={contentTypeUid}
        >
            {pageComponents?.map((component, key: number) => {
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
                    return (
                        <ListOfCards 
                            categorieListProps={component.list_of_cards} 
                            key={`list-cards-${key}`} 
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}