import React from 'react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  viewType: "grid" | "list";
  ctaLabel?: string;
}

export default function CategoryCard({ category, viewType, ctaLabel = "Voir les articles" }: CategoryCardProps) {
  
  const handleCategoryClick = () => {
    // Implémenter la navigation vers la page de la catégorie
    console.log('Navigate to category:', category.uid);
  };

  if (viewType === "list") {
    // Vue en liste horizontale
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
          {/* Image de la catégorie */}
          {category.image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={category.image.url}
                alt={category.image.title || category.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* Contenu */}
          <div className="flex-grow ">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center justify-center mt-3">
              {category.title}
            </h3>
            {category.description && (
              <p className="text-gray-600 text-sm line-clamp-2 flex items-center justify-center">
                {category.description}
              </p>
            )}
          </div>
          
          {/* Bouton CTA */}
          <div className="flex-shrink-0 mt-4 mb-4 flex items-center justify-center">
            <button
              onClick={handleCategoryClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {ctaLabel}
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
       
      </div>
    );
  }

  // Vue en grille (par défaut)
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col"
         onClick={handleCategoryClick}>
      
      {/* Image de la catégorie */}
      {category.image && (
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={category.image.url}
            alt={category.image.title || category.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      
      {/* Contenu de la card */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 flex-grow">
          {category.title}
        </h3>
        
        {category.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {category.description}
          </p>
        )}
        
        {/* Bouton CTA */}
        <button
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            handleCategoryClick();
          }}
        >
          {ctaLabel}
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}