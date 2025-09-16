import { notFound } from 'next/navigation';
import { 
  getAuthor, 
  getAuthorPage, 
  initLivePreview 
} from '@/lib/contentstack';
import RenderComponents from '@/components/render-components';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}


export default async function AuthorPage({ params }: AuthorPageProps) {  

  if (typeof window !== 'undefined') {
    initLivePreview();
  }
  console.log("params.slussg: ", params.slug)
  
    const [author, authorPage] = await Promise.all([
      getAuthor(params.slug),
      getAuthorPage('/auteur') 
    ]);

  if (!author) {
    notFound();
  }

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
  console.log("defaultPageComponents: ", defaultPageComponents)

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