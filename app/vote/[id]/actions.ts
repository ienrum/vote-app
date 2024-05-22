"use server";

import { supabase } from "@/lib/supabase";

export const submitVote = async (voteId: string, formData: FormData) => {
  const selectedOptionId = formData.getAll("option")[0] as string;

  const newVoteResult = {
    vote_id: voteId,
    option: selectedOptionId,
  };

  await supabase.from("vote_results").insert([newVoteResult]);
};
