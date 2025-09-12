import React from 'react';
import FeaturedArticleCard from './featured-article-card';

export default function FeaturedArticleSection(featuredArticleSection: any) {
  const { article_ref, background_color, highlight_text } = featuredArticleSection.featuredArticleSection;
  console.log('featuredArticleSection :', featuredArticleSection);
  console.log('article_ref :', article_ref);
  console.log('background_color :', background_color);
  console.log('highlight_text :', highlight_text);
  
  const article = article_ref?.[0];
  console.log('article :', article);
  
  if (!article) {
    return null;
  }

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: background_color?.hex || '#4a34f3' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium text-white">
              {highlight_text}
            </h2>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <FeaturedArticleCard article={article} />
          </div>
        </div>
      </div>
    </section>
  );
}