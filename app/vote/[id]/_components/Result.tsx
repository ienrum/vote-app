import { getVoteResultsOptions } from "@/app/apis/vote";

interface VoteResultProps {
  voteId: string;
}

const VoteResult = async ({ voteId }: VoteResultProps) => {
  const { data: options, error } = await getVoteResultsOptions(voteId);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <div className="mt-4">
        {options?.map(({ id, value, count }) => (
          <>
            <li key={id}>{value}</li>
            <p>{count}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default VoteResult;
