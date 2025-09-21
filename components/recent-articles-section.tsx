"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { getRecentBlogPosts } from '@/lib/contentstack';
import { BlogPost,Recent_articles } from '@/lib/types';
import RecentArticleCard from './recent-article-card';

interface RecentArticlesSectionProps {
  recentArticlesList: Recent_articles
}

export default function RecentArticlesSection({ recentArticlesList }: RecentArticlesSectionProps) {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { title, show_author, show_date, categorie_filter } = recentArticlesList;
  console.log('RecentArticlesSection props:', recentArticlesList);
  console.log('Categorie filter:', categorie_filter);

  // Extraire l'UID de la catégorie dans une variable séparée
  const categoryUid = useMemo(() => {
    return categorie_filter?.[0]?.uid;
  }, [categorie_filter]);

  useEffect(() => {
    async function fetchRecentArticles() {
      try {
        setLoading(true);
        setError(null);
        const recentArticles = await getRecentBlogPosts(categoryUid, 3);
        console.log('Fetched recent articles:', recentArticles);
        
        setArticles(recentArticles as BlogPost[]);
      } catch (err) {
        console.error('Erreur lors du chargement des articles récents:', err);
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentArticles();
  }, [categoryUid]);

  // États de chargement et d'erreur
  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des articles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          
          {/* Indicateur de filtre de catégorie */}
          {categorie_filter && (
            <div className="flex justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Catégorie : {categorie_filter[0].title}
              </span>
            </div>
          )}
        </div>

        {/* Grille des articles */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <RecentArticleCard
                  key={article.uid || index}
                  article={article}
                  showAuthor={show_author}
                  showDate={show_date}
                />
              ))}
            </div>
          </>
        ) : (
          /* État vide */
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun article trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {categorie_filter 
                ? `Aucun article récent dans la catégorie "${categorie_filter[0].title}".`
                : 'Aucun article récent disponible pour le moment.'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}