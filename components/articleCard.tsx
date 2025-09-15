import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';

interface ArticleCardProps {
  article: BlogPost;
  showAuthor?: boolean;
  showDate?: boolean;
}

export default function ArticleCard({ 
  article, 
  showAuthor = true, 
  showDate = true 
}: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image de l'article */}
      {article.image && (
        <div className="relative w-full h-48">
          <Image
            src={article.image.url}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Catégorie */}
        {article.categorie && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {article.categorie.title}
            </span>
          </div>
        )}

        {/* Titre */}
        <h3 
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
          {...article.$?.title}
        >
          <Link 
            href={`/blog/${article.uid}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {article.title}
          </Link>
        </h3>

        {/* Résumé */}
        {article.summary && (
          <p 
            className="text-gray-600 text-sm mb-4 line-clamp-3"
            {...article.$?.summary}
          >
            {article.summary}
          </p>
        )}

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Auteur */}
            {showAuthor && article.author && article.author[0] && (
              <div className="flex items-center space-x-2">
                {article.author[0].photo && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={article.author[0].photo.url}
                      alt={article.author[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Link 
                  href={`/auteur/${article.author[0].uid}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {article.author[0].title}
                </Link>
              </div>
            )}

            {/* Date de publication */}
            {showDate && article.published_date && (
              <time dateTime={article.published_date}>
                {formatDate(article.published_date)}
              </time>
            )}
          </div>

          {/* Temps de lecture */}
          {article.reading_time && (
            <span className="text-gray-400">
              {article.reading_time} min de lecture
            </span>
          )}
        </div>
      </div>
    </article>
  );
}