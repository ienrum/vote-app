"use server";

import { insertVoteResult, upCountOption } from "@/app/apis/vote";
import { revalidatePath } from "next/cache";

export const submitVote = async (voteId: string, formData: FormData) => {
  const selectedOptionId = formData.getAll("option")[0] as string;

  await insertVoteResult(selectedOptionId, voteId);
  await upCountOption(selectedOptionId);

  revalidatePath(`/vote/${voteId}`);
};
