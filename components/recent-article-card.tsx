import React from 'react';
import { BlogPost } from '@/lib/types';

interface RecentArticleCardProps {
  article: BlogPost;
  showAuthor?: boolean;
  showDate?: boolean;
}

export default function RecentArticleCard({ 
  article, 
  showAuthor = true, 
  showDate = true 
}: RecentArticleCardProps) {
  console.log('articleee :',article)
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image.url}
            alt={article.image.title || article.title || 'Article image'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {article.categorie && (
          <div className="mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              {article.categorie.title}
            </span>
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {article.summary}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {showAuthor && article.author && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {article.author[0].title}
              </span>
            )}
            
            {article.reading_time && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                </svg>
                {article.reading_time} min
              </span>
            )}
          </div>
          
          {showDate && article.published_date && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {new Date(article.published_date).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
        
        <button
          className="w-full text-blue-600 hover:text-blue-800 font-medium text-sm py-2 flex items-center justify-center group transition-colors duration-200"
          onClick={() => {
            console.log('Navigating to article:', article.uid);
          }}
        >
          Lire la suite
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}