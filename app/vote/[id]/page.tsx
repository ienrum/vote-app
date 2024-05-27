import { getVoteResultByMyId } from "@/app/apis/vote";
import VoteResult from "@/app/vote/[id]/_components/Result";
import VoteForm from "@/app/vote/[id]/_components/Form";
import CopyUrlButton from "@/app/vote/[id]/_components/CopyUrlButton";

interface PageProps {
  params: { id: string };
}

export default async function Vote({ params: { id: voteId } }: PageProps) {
  const voteResult = await getVoteResultByMyId(voteId);

  return (
    <div className="flex flex-col gap-8">
      {voteResult ? (
        <VoteResult voteId={voteId} />
      ) : (
        <VoteForm voteId={voteId} />
      )}
      <CopyUrlButton />
    </div>
  );
}
