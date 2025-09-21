"use client"; 

import { getPage, initLivePreview } from "@/lib/contentstack"; 
import { useEffect, useState } from "react"; 
import { Page } from "@/lib/types";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
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
}
