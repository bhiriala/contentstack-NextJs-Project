import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getAuthor, 
  getAuthorPage, 
  getAuthorArticles, 
  getAllAuthorSlugs,
  initLivePreview 
} from '@/lib/contentstack';
import ArticleCard from '@/components/articleCard';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
 
  console.log('Paramssssss:',params.slug);
  if (typeof window !== 'undefined') {
    initLivePreview();
  }
  function slugToText(slug: string): string {
    return decodeURIComponent(slug).replace(/-/g, " ");
  }

//   // Récupération des données
  const [author, authorPage] = await Promise.all([
    getAuthor(slugToText(params.slug)),
    getAuthorPage(`/auteur`) 
  ]);
  console.log('AuthorPage:',authorPage);
  console.log('Author:', author?.uid);

  if (!author) {
    notFound();
  }

//   // Configuration par défaut si pas de page auteur configurée
  const showArticleList = authorPage?.page_components?.find(
    component => component.author_profile
  )?.author_profile?.show_article_list ?? true;

  const articleListLimit = authorPage?.page_components?.find(
    component => component.author_profile
  )?.author_profile?.article_list_limit ?? 10;

//   // Récupération des articles si nécessaire
  const articles = showArticleList ? await getAuthorArticles(author.uid, articleListLimit) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
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
                  <p 
                    className="text-lg text-gray-600 mb-6 leading-relaxed"
                    {...author.$?.bio}
                  >
                    {author.bio}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                  {author.contact.email && (
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
                  
                  {author.contact.phone && (
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {showArticleList && articles.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Articles de {author.title}
              </h2>
              <p className="text-gray-600">
                Découvrez les derniers articles publiés par {author.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.uid}
                  article={article}
                  showAuthor={false} 
                  showDate={true}
                />
              ))}
            </div>
            {articles.length === articleListLimit && (
              <div className="text-center mt-12">
                <Link
                  href={`/blog?author=${author.uid}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Voir tous les articles
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {showArticleList && articles.length === 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Aucun article publié
            </h2>
            <p className="text-gray-600">
              {author.title} n'a pas encore publié d'articles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}