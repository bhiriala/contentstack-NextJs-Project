"use client";

import { use, useEffect, useState, useCallback } from "react";
import { initLivePreview, getBlogPost, getSimilarBlogPosts } from "@/lib/contentstack"; 
import { type BlogPost } from "@/lib/types";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";
import ArticleCard from "@/components/articleCard";
import Image from "next/image";
import { Calendar, Clock, User, Tag } from "lucide-react";

interface ArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function Article({ params }: ArticleProps) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<BlogPost>(); 
  const [similarArticles, setSimilarArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const article = await getBlogPost(resolvedParams.slug); 
      setArticle(article); 
      
      if (article?.category) {
        const similarArticles = await getSimilarBlogPosts(article?.category[0]?.uid);
        setSimilarArticles(similarArticles);
        console.log("similarArticles: ", similarArticles);
        console.log("article: ", article);
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to load category content");
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.slug]);

  useEffect(() => {
    const initializeContent = async () => {
      await initLivePreview();
      await getContent();
      ContentstackLivePreview.onEntryChange(getContent);
    };

    initializeContent();

    return () => {
      ContentstackLivePreview.onEntryChange(() => {});
    };
  }, [getContent]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">Erreur</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-gray-800 text-lg font-semibold mb-2">Article non trouvé</div>
          <p className="text-gray-600">L article que vous recherchez n existe pas.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={VB_EmptyBlockParentClass}>
      <div className="min-h-screen bg-gray-50">
        {/* Header avec image */}
        <div className="relative">
          {article.image && (
            <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
              <Image
                src={article.image.url}
                alt={article.image.title || article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
          
          {/* Titre superposé */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
                {article.title}
              </h1>
              
              {/* Métadonnées */}
              <div className="flex flex-wrap items-center gap-6 text-black/90">
                {article.author && article.author[0] && (
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-medium">{article.author[0].title}</span>
                  </div>
                )}
                
                {article.published_date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{formatDate(article.published_date)}</span>
                  </div>
                )}
                
                {article.reading_time && (
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{article.reading_time} min de lecture</span>
                  </div>
                )}
                
                {article.category && article.category[0] && (
                  <div className="flex items-center gap-2">
                    <Tag size={18} />
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {article.category[0].title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Résumé */}
            {article.summary && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                <p className="text-lg text-gray-700 font-medium italic">
                  {article.summary}
                </p>
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content || '' }}
              />
            </div>
          </div>
        </div>

        {/* Section articles similaires */}
        {similarArticles.length > 0 && (
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Articles similaires
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {similarArticles
                  .filter(similarArticle => similarArticle.uid !== article.uid)
                  .slice(0, 6)
                  .map((similarArticle) => (
                    <div key={similarArticle.uid} className="transform hover:scale-105 transition-transform duration-300">
                      <ArticleCard article={similarArticle} />
                    </div>
                  ))}
              </div>
              
              {similarArticles.length > 6 && (
                <div className="text-center mt-12">
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Voir plus d articles
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}