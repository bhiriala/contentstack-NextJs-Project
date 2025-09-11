"use client"; 

import { getPage, initLivePreview } from "@/lib/contentstack"; 
import { useEffect, useState } from "react"; 
import { Page } from "@/lib/types";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";
import RenderComponents from "@/components/render-components";


export default function Home() {
  const [page, setPage] = useState<Page>(); 

  const getContent = async () => {
    const page = await getPage("/"); 
    setPage(page); 
    console.log(page)
  };

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, []);
   return page ? (
    <RenderComponents
      pageComponents={page.page_components|| []}
      contentTypeUid='page'
      entryUid={page.uid}
    />
  ) : (
    <></>
  );

  // return (
  //   <main className="max-w-(--breakpoint-md) mx-auto">
  //     <section className="p-4">
  //       {page?.title ? (
  //         <h1
  //           className="text-4xl font-bold mb-4 text-center"
  //           {...(page?.$ && page?.$.title)} 
  //         >
  //           {page?.title}
  //         </h1>
  //       ) : null}
  //       {page?.description ? (
  //         <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
  //           {page?.description}
  //         </p>
  //       ) : null}
  //       {page?.image ? (
  //         <Image
  //           className="mb-4"
  //           width={768}
  //           height={414}
  //           src={page?.image.url}
  //           alt={page?.image.title}
  //           {...(page?.image?.$ && page?.image?.$.url)} 
  //         />
  //       ) : null}
  //       {page?.rich_text ? (
  //         <div
  //           {...(page?.$ && page?.$.rich_text)} 
  //           dangerouslySetInnerHTML={{
  //             __html: DOMPurify.sanitize(page?.rich_text),
  //           }}
  //         />
  //       ) : null}
        {/* <div
          className={`space-y-8 max-w-full mt-4 ${
            !page?.blocks || page.blocks.length === 0
              ? VB_EmptyBlockParentClass
              : ""
          }`}
          {...(page?.$ && page?.$.blocks)} 
        > */}
  //         {page?.blocks?.map((item, index) => {
  //           const { block } = item;
  //           const isImageLeft = block.layout === "image_left"; 

  //           return (
  //             <div
  //               key={block._metadata.uid}
  //               {...(page?.$ && page?.$[`blocks__${index}`])} 
  //               className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
  //                 isImageLeft ? "md:flex-row" : "md:flex-row-reverse" 
  //               }`}
  //             >
  //               <div className="w-full md:w-1/2">
  //                 {block.image ? (
  //                   <Image
  //                     key={`image-${block._metadata.uid}`}
  //                     src={block.image.url}
  //                     alt={block.image.title}
  //                     width={200}
  //                     height={112}
  //                     className="w-full"
  //                     {...(block?.$ && block?.$.image)} 
  //                   />
  //                 ) : null}
  //               </div>
  //               <div className="w-full md:w-1/2 p-4">
  //                 {block.title ? (
  //                   <h2
  //                     className="text-2xl font-bold"
  //                     {...(block?.$ && block?.$.title)} 
  //                   >
  //                     {block.title} 
  //                   </h2>
  //                 ) : null}
  //                 {block.copy ? (
  //                   <div
  //                     {...(block?.$ && block?.$.copy)}
  //                     dangerouslySetInnerHTML={{
  //                       __html: DOMPurify.sanitize(block.copy),
  //                     }}
  //                     className="prose"
  //                   />
  //                 ) : null}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </section>
  //   </main>
  // );
}
