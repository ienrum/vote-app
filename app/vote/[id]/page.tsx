import { getVoteResultByMyId } from "@/app/apis/vote";
import VoteResult from "@/app/vote/[id]/_components/Result";
import VoteForm from "@/app/vote/[id]/_components/Form";
import { Card } from "@/components/ui/card";

interface PageProps {
  params: { id: string };
}

export default async function Vote({ params: { id: voteId } }: PageProps) {
  const voteResult = await getVoteResultByMyId(voteId);

  return (
    <Card className="mt-8">
      {voteResult ? (
        <VoteResult voteId={voteId} />
      ) : (
        <VoteForm voteId={voteId} />
      )}
    </Card>
  );
}
