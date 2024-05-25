import { getVoteResultsOptions } from "@/app/apis/vote";
import VoteResult from "@/app/vote/[id]/_components/Result";
import VoteForm from "@/app/vote/[id]/_components/Form";
import { Card } from "@/components/ui/card";

interface PageProps {
  params: { id: string };
}

export default async function Vote({ params: { id: voteId } }: PageProps) {
  const { data, error } = await getVoteResultsOptions(voteId);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <Card className="mt-8">
      {data.length ? (
        <VoteResult voteId={voteId} />
      ) : (
        <VoteForm voteId={voteId} />
      )}
    </Card>
  );
}
