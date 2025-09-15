import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  getAuthor, 
  getAuthorPage, 
  getAllAuthorSlugs,
  initLivePreview 
} from '@/lib/contentstack';
import RenderComponents from '@/components/render-components';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

// Génération des paramètres statiques pour les slugs d'auteurs
export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Génération des métadonnées dynamiques
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthor(params.slug);
  
  if (!author) {
    return {
      title: 'Auteur non trouvé',
      description: 'Cet auteur n\'existe pas.'
    };
  }

  return {
    title: `${author.title} - Profil Auteur`,
    description: author.bio || `Découvrez le profil et les articles de ${author.title}`,
    openGraph: {
      title: `${author.title} - Profil Auteur`,
      description: author.bio || `Découvrez le profil et les articles de ${author.title}`,
      images: author.photo ? [author.photo.url] : [],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  // Initialisation du live preview
  if (typeof window !== 'undefined') {
    initLivePreview();
  }

  // Récupération des données
  const [author, authorPage] = await Promise.all([
    getAuthor(params.slug),
    getAuthorPage(`/auteur/${params.slug}`) // ou getAuthorPage('/auteur') selon votre config ContentStack
  ]);

  if (!author) {
    notFound();
  }

  // Si pas de page d'auteur configurée dans ContentStack, créer une configuration par défaut
  const defaultPageComponents = authorPage?.page_components || [
    {
      author_profile: {
        show_article_list: true,
        article_list_limit: 10
      }
    },
    {
      list_of_cards: {
        section_title: `Articles de ${author.title}`,
        view_type: "grid" as const,
        cta_label: "Lire l'article"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <RenderComponents
        pageComponents={defaultPageComponents}
        entryUid={author.uid}
        contentTypeUid="author"
        author={author}
      />
    </div>
  );
}