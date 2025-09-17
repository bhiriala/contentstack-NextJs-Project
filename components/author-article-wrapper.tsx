import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List_of_cards, BlogPost, Author } from '@/lib/types';
import { getAuthorArticles } from '../lib/contentstack';

interface AuthorArticlesWrapperProps {
  listOfCardsProps: List_of_cards;
  author: Author;
  limit?: number;
}

function AuthorArticleCard({ 
  article, 
  viewType, 
  ctaLabel 
}: { 
  article: BlogPost; 
  viewType: "grid" | "list"; 
  ctaLabel: string; 
}) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (viewType === "list") {
    console.log("article in list view: ", article);
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
              {article.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                  {article.category[0].title}
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
          />

          
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
          <div className="flex items-center space-x-2">
            {article.category && (
              <span className="text-sm text-gray-600">{article.category[0].title}</span>
            )}
          </div>
          
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
}

// Composant principal - maintenant un composant serveur
export default async function AuthorArticlesWrapper({ 
  listOfCardsProps, 
  author, 
  limit = 10 
}: AuthorArticlesWrapperProps) {
  // Récupération des données côté serveur
  const articles = await getAuthorArticles(author.uid, limit);
  console.log("articles by author: ", articles);

  const { section_title, view_type, cta_label } = listOfCardsProps;

  const getGridClasses = () => {
    if (view_type === "list") {
      return "space-y-4"; 
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12";
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section_title}
          </h2>
          
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              {view_type === "grid" ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Vue en grille
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Vue en liste
                </>
              )}
            </span>
            <span>•</span>
            <span>{articles.length} article{articles.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className={getGridClasses()}>
            {articles.map((article, index) => (
              
              
              <AuthorArticleCard
                key={article.uid || index}
                article={article}
                viewType={view_type}
                ctaLabel={cta_label}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun article publié</h3>
            <p className="mt-1 text-sm text-gray-500">
              {author.title} n'a pas encore publié d'articles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}