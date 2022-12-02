import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Database } from "../../lib/database.types";

export default function PapersAdd() {
  const supabaseClient = useSupabaseClient<Database>();
  const [authors, setAuthors] =
    useState<Awaited<ReturnType<typeof fetchAuthors>>>();

  async function fetchAuthors() {
    const { data } = await supabaseClient.from("author").select("*");
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAuthors();
      setAuthors(data);
    }
    fetchData();
  }, []);

  const { handleSubmit, register, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    name: "paperAuthors",
    control,
  });

  async function insertPaper(formData: any) {
    const toastId = toast.loading(`Adding ${formData.title}...`);
    const { data: paperData, error: paperError } = await supabaseClient
      .from("paper")
      .insert({ title: formData.title, abstract: formData.abstract })
      .select()
      .single();
    if (paperData) {
      toast.success(`Added ${formData.title}`, { id: toastId });
      formData.paperAuthors.forEach(async (author: any) => {
        const toastId = toast.loading(
          `Adding ${author.id} to ${formData.title}...`
        );
        const { data: paperAuthorData, error: paperAuthorError } =
          await supabaseClient
            .from("paper_author")
            .insert({
              paper_id: paperData.id,
              author_id: author.id,
              position: author.position,
            })
            .select()
            .single();
        if (paperAuthorData) {
          toast.success(`Added ${author.id} to ${formData.title}`, {
            id: toastId,
          });
        } else if (paperAuthorError) {
          toast.error(paperAuthorError.message, { id: toastId });
        } else {
          toast.error(`Failed to add ${author.id} to ${formData.title}`, {
            id: toastId,
          });
        }
      });
      reset();
    } else if (paperError) {
      toast.error(paperError.message, { id: toastId });
    } else {
      toast.error(`Failed to add ${formData.title}`, { id: toastId });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(insertPaper)}>
        <div>
          <label>Title</label>
          <input {...register("title")} type="text" />
        </div>
        <div>
          <label>Abstract</label>
          <textarea {...register("abstract")} />
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div>
              <label>Author</label>
              <input
                {...register(`paperAuthors.${index}.id`)}
                type="textarea"
              />
            </div>
            <div>
              <label>Position</label>
              <input
                {...register(`paperAuthors.${index}.position`)}
                type="number"
              />
            </div>
            <button onClick={() => remove(index)} type="button">
              Remove author
            </button>
          </div>
        ))}
        <button onClick={() => append({ id: "" })} type="button">
          Add author
        </button>
        <button type="submit">Submit</button>
        <div>
          {authors?.map((author) => (
            <div key={author.id}>
              <p>{author.id}</p>
              <p>{author.name}</p>
              <p>______________</p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
