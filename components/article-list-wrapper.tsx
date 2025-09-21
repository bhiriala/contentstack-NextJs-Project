import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List_of_cards, BlogPost } from '@/lib/types';
import { getBlogPosts } from '../lib/contentstack';
import ListOfCardsSection, { CardItem } from './list-of-cards-section';

interface ArticleListWrapperProps {
  listOfCardsProps: List_of_cards;
}

// Fonction pour adapter les articles au format CardItem
const adaptArticlesToCardItems = async (): Promise<CardItem[]> => {
  const articles = await getBlogPosts();
  return articles.map(article => ({
    // Garder toutes les propriétés originales de BlogPost
    ...article,
    // Mapper les propriétés spécifiques pour CardItem
    description: article.summary, // Mapper summary vers description
  }));
};

// Fonction de rendu pour les cartes d'articles
const renderArticleCard = (item: CardItem, viewType: "grid" | "list", ctaLabel: string) => {
  const article = item as BlogPost;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (viewType === "list") {
    return (
      <div className="flex items-start p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {article.image && (
          <div className="relative w-24 h-24 flex-shrink-0 mr-6">
            <Image
              src={article.image.url}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
              <Link href={`/blog/${article.uid}`}>
                {article.title}
              </Link>
            </h3>
            {article.published_date && (
              <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
                {formatDate(article.published_date)}
              </span>
            )}
          </div>
          
          {article.summary && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.summary}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {article.author && article.author[0] && (
                <span className="flex items-center">
                  {article.author[0].photo && (
                    <div className="relative w-5 h-5 rounded-full overflow-hidden mr-2">
                      <Image
                        src={article.author[0].photo.url}
                        alt={article.author[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {article.author[0].title}
                </span>
              )}
              {article.reading_time && (
                <span>{article.reading_time} min de lecture</span>
              )}
            </div>
            
            <Link
              href={`/blog/${article.uid}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              {ctaLabel}
              <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Vue en grille
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {article.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.image.url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
          
          {article.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {article.category[0].title}
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {article.published_date && (
            <time className="text-sm text-gray-500">
              {formatDate(article.published_date)}
            </time>
          )}
          {article.reading_time && (
            <span className="text-sm text-gray-500">
              {article.reading_time} min
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          <Link href={`/blog/${article.uid}`}>
            {article.title}
          </Link>
        </h3>
        
        {article.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {article.author && article.author[0] && (
            <div className="flex items-center space-x-2">
              {article.author[0].photo && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={article.author[0].photo.url}
                    alt={article.author[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm text-gray-600">{article.author[0].title}</span>
            </div>
          )}
          
          <Link
            href={`/blog/${article.uid}`}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 group-hover:shadow-md text-sm"
          >
            {ctaLabel}
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default function ArticleListWrapper({ listOfCardsProps }: ArticleListWrapperProps) {
  const emptyStateConfig = {
    icon: (
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    title: "Aucun article disponible",
    description: "Les articles seront affichés ici une fois qu'ils seront publiés dans ContentStack."
  };

  return (
    <ListOfCardsSection
      listOfCardsProps={listOfCardsProps}
      fetchItems={adaptArticlesToCardItems}
      renderCard={renderArticleCard}
      emptyStateConfig={emptyStateConfig}
    />
  );
}