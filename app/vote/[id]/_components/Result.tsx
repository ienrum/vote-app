import { getVoteOptions } from "@/app/apis/vote";

interface VoteResultProps {
  voteId: string;
}

const VoteResult = async ({ voteId }: VoteResultProps) => {
  const { data: options, error } = await getVoteOptions(voteId);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="mt-4">
      {options?.map(({ id, value, count }) => (
        <li key={id}>
          {value}
          <p>{count}</p>
        </li>
      ))}
    </div>
  );
};

export default VoteResult;
