"use client";

import { use, useEffect, useState, useCallback } from "react";
import { initLivePreview,getAuthor,getAuthorPage } from "@/lib/contentstack"; 
import { Author, Page } from "@/lib/types";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

import RenderComponents from "@/components/render-components";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const resolvedParams = use(params);
  const [auteur, setAuteur] = useState<Author>(); 
  const [auteurPage, setAuteurPage] = useState<Page>(); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const auteur = await getAuthor(resolvedParams.slug); 
      setAuteur(auteur); 
      const auteurPage = await getAuthorPage('/auteur');
      setAuteurPage(auteurPage);
      console.log("auteurPage: ", auteurPage);
      console.log("auteur: ", auteur);
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to load author content");
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

  if (!auteur) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-gray-800 text-lg font-semibold mb-2">Auteur non trouvé</div>
          <p className="text-gray-600">L autur que vous recherchez n existe pas.</p>
        </div>
      </div>
    );
  }
  
  return auteurPage ? (
      <RenderComponents
        pageComponents={auteurPage.page_components|| []}
        contentTypeUid='author'
        entryUid={auteur.uid}
        author={auteur}
      />
    ) : (
      <></>
    );
}