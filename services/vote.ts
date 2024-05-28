import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const VOTES_TABLE = "votes";
export const VOTES_RESULTS_TABLE = "vote_results";
export const OPTION_TABLE = "option";
export const USER_TABLE = "user";

class VoteService {
  constructor() {}

  async createVotes(insertInfo: { title: string; description: string }) {
    const { data: userData, error: userError } =
      await createClient().auth.getUser();

    if (userError || !userData || !userData?.user?.id) {
      redirect("/login");
    }

    const { data, error } = await createClient()
      .from(VOTES_TABLE)
      .insert({ ...insertInfo, author_id: userData?.user.id })
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async createOptions(values: string[], vote_id: string) {
    const options = values.map((value) => ({
      value,
      vote_id,
    }));

    const { data, error } = await createClient()
      .from(OPTION_TABLE)
      .insert(options);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getVoteResultsByMyId(voteId: string) {
    const { data: userData, error: userError } =
      await createClient().auth.getUser();

    if (userError || !userData || !userData?.user.id) {
      redirect("/login");
    }

    const { data, error } = await createClient()
      .from(VOTES_RESULTS_TABLE)
      .select("*")
      .eq("user_id", userData?.user.id)
      .eq("vote_id", voteId)
      .single();

    return data;
  }
}

const voteService = new VoteService();

export default voteService;
