import { getVote, getVoteOptions } from "@/app/apis/vote";
import { submitVote } from "@/app/vote/[id]/actions";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VoteFormProps {
  voteId: string;
}

export default async function VoteForm({ voteId }: VoteFormProps) {
  const { data, error } = await getVote(voteId);
  const { data: options } = await getVoteOptions(voteId);
  const submitVoteWithParmas = submitVote.bind(null, voteId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("투표를 찾을 수 없습니다.");
  }

  return (
    <>
      <CardTitle>{data.title}</CardTitle>
      <CardTitle className="mt-4">{data.description}</CardTitle>
      <form action={submitVoteWithParmas} className="mt-4">
        {options?.map(({ id, value }) => (
          <Label key={id}>
            <Input type="radio" name="option" value={id} required />
            {value}
          </Label>
        ))}
        <Button type="submit" className="mt-4">
          투표 제출
        </Button>
      </form>
    </>
  );
}
