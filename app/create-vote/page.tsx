import VoteForm from "@/app/create-vote/_components/VoteForm";
import { createClient } from "@/lib/supabase/server";

export default async function CreateVote() {
  return <VoteForm />;
}
