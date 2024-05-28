import { getVote, getVoteOptions } from "@/app/apis/vote";
import { submitVote } from "@/app/vote/[id]/actions";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tables } from "@/types/supabase";

interface VoteFormProps {
  data: Tables<"votes"> | null;
  options: Tables<"option">[] | null;
  voteId: string;
}

export default async function VoteForm({
  data,
  options,
  voteId,
}: VoteFormProps) {
  const submitVoteWithParmas = submitVote.bind(null, voteId);

  return (
    <>
      <CardTitle>{data?.title}</CardTitle>
      <CardDescription className="mt-4">{data?.description}</CardDescription>
      <form action={submitVoteWithParmas} className="mt-4">
        <ul className="flex flex-col gap-4">
          {options?.map(({ id, value }) => (
            <li key={id} className="flex justify-start items-center ">
              <Input
                className="hidden peer"
                type="radio"
                name="option"
                value={id}
                id={id}
                required
              />
              <Label
                htmlFor={id}
                className="w-full bg-slate-white h-12 flex items-center pl-2 rounded-md  border-slate-300 hover:bg-slate-200 cursor-pointer border-2 text-slate-800 peer-checked:bg-slate-300"
              >
                {value}
              </Label>
            </li>
          ))}
        </ul>
        <Button type="submit" className="mt-4">
          투표 제출
        </Button>
      </form>
    </>
  );
}
