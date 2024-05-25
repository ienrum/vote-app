"use server";

import { insertVoteResult } from "@/app/apis/vote";
import { revalidatePath } from "next/cache";

export const submitVote = async (voteId: string, formData: FormData) => {
  const selectedOptionId = formData.getAll("option")[0] as string;

  const votesResponse = await insertVoteResult(voteId, selectedOptionId);

  if (votesResponse.error) {
    throw new Error(votesResponse.error.message);
  }

  revalidatePath(`/vote/${voteId}`);
};
