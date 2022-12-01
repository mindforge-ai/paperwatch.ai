import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../lib/database.types";

export default function Index() {
  const supabaseClient = useSupabaseClient<Database>();
  const [papers, setPapers] =
    useState<Awaited<ReturnType<typeof fetchPapers>>>();

  async function fetchPapers() {
    const { data } = await supabaseClient
      .from("paper")
      .select("*, paper_author ( author (*), position )");
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPapers();
      setPapers(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Paperwatch</h1>
      {papers?.map((paper) => (
        <div key={paper.id}>
          <span>{paper.title}</span>
          <p>{paper.abstract}</p>
          <div>
            {Array.isArray(paper.paper_author) &&
              paper.paper_author
                .sort((a, b) => (a.position || 0) - (b.position || 0))
                .map((paper_author) => (
                  // @ts-ignore
                  <div key={paper.id + "-" + paper_author.author?.id}>
                    {/* @ts-ignore */}
                    {paper_author.author?.name}
                  </div>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}
