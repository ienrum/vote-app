import { getVote, getVoteOptions, getVoteResultByMyId } from "@/app/apis/vote";
import VoteResult from "@/app/vote/[id]/_components/Result";
import VoteForm from "@/app/vote/[id]/_components/Form";
import CopyUrlButton from "@/app/vote/[id]/_components/CopyUrlButton";

interface PageProps {
  params: { id: string };
}

export default async function Vote({ params: { id: voteId } }: PageProps) {
  const voteResult = await getVoteResultByMyId(voteId);
  const { data, error } = await getVote(voteId);
  const { data: options } = await getVoteOptions(voteId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("투표를 찾을 수 없습니다.");
  }

  return (
    <div className="flex flex-col gap-8">
      {voteResult ? (
        <VoteResult data={data} voteId={voteId} />
      ) : (
        <VoteForm data={data} options={options} voteId={voteId} />
      )}
      <CopyUrlButton />
    </div>
  );
}
