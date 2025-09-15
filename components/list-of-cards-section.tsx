"use client"
import React, { useEffect, useState } from 'react';
import { List_of_cards } from '@/lib/types';

// Type générique pour n'importe quel item de carte
export interface CardItem {
  uid: string;
  title: string;
  description?: string;
  image?: {
    url: string;
  } | null;
  [key: string]: any; // Propriétés supplémentaires flexibles
}

// Props du composant de carte générique
interface GenericCardProps {
  item: CardItem;
  viewType: "grid" | "list";
  ctaLabel: string;
  renderCard: (item: CardItem, viewType: "grid" | "list", ctaLabel: string) => React.ReactNode;
}

// Props du composant principal
interface ListOfCardsSectionProps {
  listOfCardsProps: List_of_cards;
  fetchItems: () => Promise<CardItem[]>; // Fonction pour récupérer les données
  renderCard: (item: CardItem, viewType: "grid" | "list", ctaLabel: string) => React.ReactNode; // Fonction de rendu personnalisée
  emptyStateConfig?: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  };
}

// Composant de carte générique
function GenericCard({ item, viewType, ctaLabel, renderCard }: GenericCardProps) {
  return <>{renderCard(item, viewType, ctaLabel)}</>;
}

// Composant principal générique
export default function ListOfCardsSection({ 
  listOfCardsProps, 
  fetchItems, 
  renderCard,
  emptyStateConfig 
}: ListOfCardsSectionProps) {
  const [items, setItems] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { section_title, view_type, cta_label } = listOfCardsProps;

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedItems = await fetchItems();
        console.log('Fetched items:', fetchedItems);
        
        setItems(fetchedItems);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [fetchItems]);

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erreur de chargement
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getGridClasses = () => {
    if (view_type === "list") {
      return "space-y-4"; 
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12";
  };

  const defaultEmptyState = {
    icon: (
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: "Aucun contenu disponible",
    description: "Le contenu sera affiché ici une fois qu'il sera créé dans ContentStack."
  };

  const emptyState = emptyStateConfig || defaultEmptyState;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section_title}
          </h2>
          
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              {view_type === "grid" ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Vue en grille
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Vue en liste
                </>
              )}
            </span>
            <span>•</span>
            <span>{items.length} élément{items.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {items.length > 0 ? (
          <div className={getGridClasses()}>
            {items.map((item, index) => (
              <GenericCard
                key={item.uid || index}
                item={item}
                viewType={view_type}
                ctaLabel={cta_label}
                renderCard={renderCard}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            {emptyState.icon}
            <h3 className="mt-2 text-sm font-medium text-gray-900">{emptyState.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{emptyState.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}