import { createClient } from "@/lib/supabase/server";
import voteService from "@/services/vote";

export const createVotePost = async (
  values: string[],
  metaData: { title: string; description: string }
) => {
  const { id: voteId } = await voteService.createVotes(metaData);
  await voteService.createOptions(values, voteId);

  return voteId;
};

export const getVoteResultByMyId = async (voteId: string) => {
  const data = await voteService.getVoteResultsByMyId(voteId);

  return data;
};

export const getVote = async (id: string) => {
  const response = await createClient()
    .from("votes")
    .select("*")
    .eq("id", id)
    .single();

  return response;
};

export const getVoteOptions = async (voteId: string) => {
  const response = await createClient()
    .from("option")
    .select("*")
    .eq("vote_id", voteId);

  return response;
};

export const insertVoteResult = async (optionId: string, vote_id: string) => {
  let myId = voteService.getMyId();

  if (!myId) {
    myId = (await voteService.setMyId()).id;
  }

  const { data: result, error } = await createClient()
    .from("vote_results")
    .insert([
      {
        user_id: myId,
        option_id: optionId,
        vote_id,
      },
    ])
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return result;
};

export const upCountOption = async (optionId: string) => {
  let myId = voteService.getMyId();

  if (!myId) {
    myId = (await voteService.setMyId()).id;
  }

  const { data: option, error: optionError } = await createClient()
    .from("option")
    .select("*")
    .eq("id", optionId)
    .single();

  const { data: result, error } = await createClient()
    .from("option")
    .update({ count: option?.count ? option.count + 1 : 1 })
    .eq("id", optionId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return result;
};
