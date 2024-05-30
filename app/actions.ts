"use server";

import { createVotePost } from "@/app/apis/vote";
import { redirect } from "next/navigation";

export const createVotePostAction = async (formData: FormData) => {
  const values = formData.getAll("option") as string[];
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const metaData = { title, description };

  const vote_id = await createVotePost(values, metaData);
  redirect(`/vote/${vote_id}`);
};
