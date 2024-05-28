"use client";

import { submitVote } from "@/app/vote/[id]/actions";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tables } from "@/types/supabase";
import { useFormStatus } from "react-dom";

interface VoteFormProps {
  data: Tables<"votes"> | null;
  options: Tables<"option">[] | null;
  voteId: string;
}

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-4" disabled={pending}>
      {pending ? "투표 중..." : "투표하기"}
    </Button>
  );
};

export default function VoteForm({ data, options, voteId }: VoteFormProps) {
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
        <Submit />
      </form>
    </>
  );
}
