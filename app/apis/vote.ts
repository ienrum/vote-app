import { supabase } from "@/lib/supabase";

export interface Option {
  id: string;
  value: string;
}

export const getVote = async (id: string) => {
  const response = await supabase
    .from("votes")
    .select("*")
    .eq("id", id)
    .single();

  return response;
};
