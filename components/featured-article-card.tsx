import React from 'react';

interface FeaturedArticleCardProps {
  article: {
    uid: string;
    title: string;
    summary?: string;
    image?: {
      url: string;
      title?: string;
    };
    author?: any;
    publish_details?: {
      time: string;
    };
  };
}

export default function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full transform hover:scale-105 transition-transform duration-300">

      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image.url}
            alt={article.image.title || article.title || 'Article image'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        {article.summary && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.summary}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          {article.author && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {article.author[0]?.title || 'Auteur inconnu'}
            </span>
          )}
          
          {article.publish_details?.time && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {new Date(article.publish_details.time).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
        
        <button
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {
            console.log('Navigating to article:', article.uid);
          }}
        >
          Lire l'article
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}