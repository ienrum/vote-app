import VoteForm from "@/app/create-vote/_components/VoteForm";
import { createClient } from "@/lib/supabase/server";

export default async function CreateVote() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log(data, error);
  return <VoteForm />;
}
