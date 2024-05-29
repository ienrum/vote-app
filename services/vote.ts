import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

export const VOTES_TABLE = "votes";
export const VOTES_RESULTS_TABLE = "vote_results";
export const OPTION_TABLE = "option";
export const USERS_TABLE = "users";

class VoteService {
  constructor(private myId?: string) {}

  getMyId() {
    const cookieStore = cookies();
    this.myId = cookieStore.get("userId")?.value;
    return this.myId;
  }

  async setMyId() {
    const userId = uuidv4();
    const cookieStore = cookies();
    cookieStore.set("userId", userId);

    const { data, error } = await createClient()
      .from(USERS_TABLE)
      .upsert({ id: userId })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async createVotes(insertInfo: { title: string; description: string }) {
    let userId = this.getMyId();

    if (!userId) {
      userId = (await this.setMyId()).id;
    }

    const { data: responseData, error } = await createClient()
      .from(VOTES_TABLE)
      .insert([{ ...insertInfo, author: userId }])
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return responseData;
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
    const userId = this.getMyId();

    const { data, error } = await createClient()
      .from(VOTES_RESULTS_TABLE)
      .select("*")
      .eq("user_id", userId!)
      .eq("vote_id", voteId)
      .single();

    return data;
  }
}

const voteService = new VoteService();

export default voteService;
