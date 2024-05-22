import { getVote } from "@/app/apis/vote";
import { submitVote } from "@/app/vote/[id]/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Option } from "@/app/apis/vote";

interface PageProps {
  params: { id: string };
}

export default async function Vote({ params: { id: voteId } }: PageProps) {
  const { data, error } = await getVote(voteId);
  const options = JSON.parse(data?.options as string) as Option[];
  const submitVoteWithParmas = submitVote.bind(null, voteId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("투표를 찾을 수 없습니다.");
  }

  return (
    <Card className="mt-8">
      <h1>{data.title}</h1>
      <p className="mt-4">{data.description}</p>
      <form action={submitVoteWithParmas} className="mt-4">
        {options.map(({ id, value }, index) => (
          <Label key={index}>
            <Input type="radio" name="option" value={id} required />
            {value}
          </Label>
        ))}
        <Button type="submit" className="mt-4">
          투표 제출
        </Button>
      </form>
    </Card>
  );
}
