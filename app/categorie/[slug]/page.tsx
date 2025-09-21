"use client";

import { use, useEffect, useState, useCallback } from "react";
import { initLivePreview, getCategory, getCategoryArticles } from "@/lib/contentstack"; 
import { type Category, type BlogPost } from "@/lib/types";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";
import ArticleCard from "@/components/articleCard";
import Image from "next/image";

interface CategoryProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function Categorie({ params }: CategoryProps) {
  const resolvedParams = use(params);
  const [categorie, setCategorie] = useState<Category>(); 
  const [categorieArticles, setCategorieArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const categorie = await getCategory(resolvedParams.slug); 
      setCategorie(categorie); 
      
      if (categorie?.uid) {
        const categorieArticles = await getCategoryArticles(categorie.uid);
        setCategorieArticles(categorieArticles);
        console.log("categorieArticles: ", categorieArticles);
        console.log("categorie: ", categorie);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!categorie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Category not found</div>
      </div>
    );
  }
  
  return (
    <div className={VB_EmptyBlockParentClass}>
      <div className="container mx-auto px-4 py-8">
        {categorie.image && (
          <div className="mb-8">
            <Image
              src={categorie.image.url}
              alt={categorie.image.title || categorie.title}
              width={1600}
              height={400}
              className=" h-64 md:h-80 lg:h-96 rounded-lg shadow-lg"
              priority
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{categorie.title}</h1>
        
        {categorie.description && (
          <p className="text-gray-600 mb-8">{categorie.description}</p>
        )}

        <h2 className="text-2xl font-semibold mb-6">
          Articles in {categorie.title}
        </h2>
        {categorieArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categorieArticles.map((article) => (
                <ArticleCard article={article} key={article.uid}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}