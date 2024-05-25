import { supabase } from "@/lib/supabase";

export interface Option {
  value: string;
}

export interface ResultOption {
  id: string;
  value: string;
  count: number;
}

interface VoteData {
  title: string;
  description: string;
  options: Option[];
}
export const createVotePost = async (voteData: VoteData) => {
  const { options, ...metaData } = voteData;

  const { data, error: votesError } = await supabase
    .from("votes")
    .insert([metaData])
    .select("*")
    .single();

  const vote_id = data?.id;

  if (votesError) {
    throw new Error(votesError.message);
  }

  const newOptions = options.map((option) => ({
    ...option,
    vote_id,
  }));

  const { error: votesOptionsError } = await supabase
    .from("vote_results_options")
    .insert(newOptions);

  if (votesOptionsError) {
    throw new Error(votesOptionsError.message);
  }

  return vote_id;
};

export const getVote = async (id: string) => {
  const response = await supabase
    .from("votes")
    .select("*")
    .eq("id", id)
    .single();

  return response;
};

export const getVoteResultsOptions = async (voteId: string) => {
  const response = await supabase
    .from("vote_results_options")
    .select("*")
    .eq("vote_id", voteId);

  return response;
};

export const insertVoteResult = async (voteId: string, optionId: string) => {
  const response = await supabase
    .from("vote_results")
    .insert([
      {
        vote_id: voteId,
        option: optionId,
      },
    ])
    .select("*");

  return response;
};
