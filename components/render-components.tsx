import React from 'react';
import {RenderProps} from '../lib/types';
import FeaturedArticleSection from './featured-article-section';
import RecentArticlesSection from './recent-articles-section';
import ListOfCards from './list-of-cards-section';
export default function RenderComponents(props: RenderProps) {
    const { pageComponents, entryUid, contentTypeUid } = props;
    console.log('page component overview :',pageComponents);
      return (
        <div
        data-pageref={entryUid}
        data-contenttype={contentTypeUid}
        >
            {pageComponents?.map((component, key: number) => {
                if (component.featured_article_section) {
                   return (
                    <FeaturedArticleSection featuredArticleSection={component.featured_article_section} key={`component-${key}`} />
                    );
                } 
                if (component.recent_articles_list) {
                    return (
                        <RecentArticlesSection recentArticlesList={component.recent_articles_list} key={`component-${key}`} />
                    );
                } 
                if (component.list_of_cards) {
                    return (
                        <ListOfCards categorieList={component.list_of_cards} key={`component-${key}`} />
                    );
                }
            })}
        </div>
);
//   const { pageComponents, blogPost, entryUid, contentTypeUid, locale } = props;
//   console.log('page component overview :',pageComponents);
//   return (
//     <div
//       data-pageref={entryUid}
//       data-contenttype={contentTypeUid}
//       data-locale={locale}
//     >
//       {pageComponents?.map((component, key: number) => {
//         if (component.hero_banner) {
//           return blogPost ? (
//             <BlogBanner
//               blogBanner={component.hero_banner}
//               key={`component-${key}`}
//             />
//           ) : (
//             <HeroBanner
//               banner={component.hero_banner}
//               key={`component-${key}`}
//             />
//           );
//         }
//         if (component.section) {
//           return (
//             <Section section={component.section} key={`component-${key}`} />
//           );
//         }
//         if (component.section_with_buckets) {
//           return component.section_with_buckets.bucket_tabular ? (
//             <AboutSectionBucket
//               sectionWithBuckets={component.section_with_buckets}
//               key={`component-${key}`}
//             />
//           ) : (
//             <SectionBucket
//               section={component.section_with_buckets}
//               key={`component-${key}`}
//             />
//           );
//         }
//         if (component.from_blog) {
//           return (
//             <BlogSection
//               fromBlog={component.from_blog}
//               key={`component-${key}`}
//             />
//           );
//         }
//         if (component.section_with_cards) {
//           return (
//             <CardSection
//               cards={component.section_with_cards.cards}
//               key={`component-${key}`}
//             />
//           );
//         }
//         if (component.section_with_html_code) {
//           return (
//             <SectionWithHtmlCode
//               embedCode={component.section_with_html_code}
//               key={`component-${key}`}
//             />
//           );
//         }
//         if (component.our_team) {
//           return (
//             <TeamSection
//               ourTeam={component.our_team}
//               key={`component-${key}`}
//             />
//           );
//         }
//       })}
//     </div>
//   );
}
