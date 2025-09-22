import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List_of_cards, Category } from '@/lib/types';
import { getCategories } from '../lib/contentstack';
import ListOfCardsSection, { CardItem } from './list-of-cards-section';

interface CategoryListWrapperProps {
  listOfCardsProps: List_of_cards;
}

const adaptCategoriesToCardItems = async (): Promise<CardItem[]> => {
  const categories = await getCategories();
  return categories.map(category => ({
    ...category,
  }));
};

const renderCategoryCard = (item: CardItem, viewType: "grid" | "list", ctaLabel: string) => {
  const category = item as Category;
  console.log('Rendering category card:', category.image?.url, 'View type:', viewType);

  if (viewType === "list") {
    return (
      <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {category.image && (
          <div className="relative w-16 h-16 flex-shrink-0 mr-4">
            <Image
              src={category.image?.url}
              alt={category.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {category.title}
          </h3>
          {category.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {category.description}
            </p>
          )}
          <Link
            href={`/categories/${category.uid}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {category.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={category.image?.url}
            alt={category.title}
            fill
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {category.title}
        </h3>
        
        {category.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {category.description}
          </p>
        )}
        
        <Link
          href={`/categorie/${category.title}`}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 group-hover:shadow-md"
        >
          {ctaLabel}
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default function CategoryListWrapper({ listOfCardsProps }: CategoryListWrapperProps) {
  const emptyStateConfig = {
    icon: (
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: "Aucune catégorie disponible",
    description: "Les catégories seront affichées ici une fois qu'elles seront créées dans ContentStack."
  };

  return (
    <ListOfCardsSection
      listOfCardsProps={listOfCardsProps}
      fetchItems={adaptCategoriesToCardItems}
      renderCard={renderCategoryCard}
      emptyStateConfig={emptyStateConfig}
    />
  );
}