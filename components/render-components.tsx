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
    
    return (
        <div
            data-pageref={entryUid}
            data-contenttype={contentTypeUid}
        >
            {pageComponents?.map((component, key: number) => {
                // Profil d'auteur
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

                // Section d'articles en vedette
                if (component.featured_article_section) {
                    return (
                        <FeaturedArticleSection 
                            featuredArticleSection={component.featured_article_section} 
                            key={`featured-article-${key}`} 
                        />
                    );
                } 

                // Section des articles récents
                if (component.recent_articles_list) {
                    return (
                        <RecentArticlesSection 
                            recentArticlesList={component.recent_articles_list} 
                            key={`recent-articles-${key}`} 
                        />
                    );
                } 

                // Liste de cartes générique
                if (component.list_of_cards) {
                    const block = component.list_of_cards;
                    const sectionTitle = block.section_title.toLowerCase();
                    
                    // Si c'est une page d'auteur et que le titre suggère des articles d'auteur
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
                                limit={10} // Ou récupérer de la config
                                key={`author-articles-${key}`}
                            />
                        );
                    }
                    
                    // Si le titre contient "article" ou "blog", afficher les articles généraux
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
                    
                    // Sinon, afficher les catégories (comportement par défaut)
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