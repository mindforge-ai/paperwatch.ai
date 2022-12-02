import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AuthorsAdd() {
  const supabaseClient = useSupabaseClient();
  const { handleSubmit, register, reset } = useForm();

  async function insertAuthor(formData: any) {
    const toastId = toast.loading(`Adding ${formData.name}...`);
    const { data, error } = await supabaseClient
      .from("author")
      .insert({ name: formData.name })
      .select()
      .single();
    if (data) {
      toast.success(`Added ${formData.name}`, { id: toastId });
      reset();
    } else if (error) {
      toast.error(error.message, { id: toastId });
    } else {
      toast.error(`Failed to add ${formData.name}`, { id: toastId });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(insertAuthor)}>
        <div>
          <label>Name</label>
          <input {...register("name")} type="text" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
