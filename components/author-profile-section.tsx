import React from 'react';
import Image from 'next/image';
import { Author } from '@/lib/types';

interface AuthorProfileSectionProps {
  author: Author;
  authorProfileConfig?: {
    show_article_list: boolean;
    article_list_limit: number;
  };
}

export default function AuthorProfileSection({ 
  author, 
  authorProfileConfig 
}: AuthorProfileSectionProps) {
  return (
    <section className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {author.photo && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src={author.photo.url}
                  alt={author.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                {...author.$?.title}
              >
                {author.title}
              </h1>

              {author.bio && (
                <div
                  className="text-lg text-gray-600 mb-6 leading-relaxed"
                  {...author.$?.bio}
                  dangerouslySetInnerHTML={{ __html: author.bio }}
                />
              )}


              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                {author.contact?.email && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <a 
                      href={`mailto:${author.contact.email}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                      {...author.$?.contact?.email}
                    >
                      {author.contact.email}
                    </a>
                  </div>
                )}
                
                {author.contact?.phone && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span {...author.$?.contact?.phone}>
                      {author.contact.phone}
                    </span>
                  </div>
                )}
              </div>

              {authorProfileConfig?.show_article_list && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center md:justify-start space-x-8 text-sm">
                    <div className="text-center md:text-left">
                      <div className="font-semibold text-gray-900">Articles publiés</div>
                      <div className="text-gray-600">Voir ci-dessous</div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="font-semibold text-gray-900">Limite d affichage</div>
                      <div className="text-gray-600">{authorProfileConfig.article_list_limit} articles</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-px bg-gray-300"></div>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}