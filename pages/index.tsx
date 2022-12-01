import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../lib/database.types";

export default function Index() {
  const supabaseClient = useSupabaseClient<Database>();
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("paper").select("*");
      setData(data);
    }
    loadData();
  }, []);

  return (
    <div>
      <h1>Paperwatch</h1>
      <h2>Test</h2>
      {data?.map((paper: any) => (
        <div key={paper.id}>
          <span>{paper.title}</span>
        </div>
      ))}
    </div>
  );
}
