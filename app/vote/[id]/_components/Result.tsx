import { getVoteOptions } from "@/app/apis/vote";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VoteResultProps {
  voteId: string;
}

const VoteResult = async ({ voteId }: VoteResultProps) => {
  const { data: options, error } = await getVoteOptions(voteId);
  const totalCount = options?.reduce((acc, { count }) => acc + (count ?? 0), 0);
  const percentageOf = (count: number) =>
    `${((count / (totalCount ?? 1)) * 100).toFixed(0)}%`;

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {options?.map(({ id, value, count }) => (
          <li key={id} className="flex justify-start items-center ">
            <p
              className="w-full bg-slate-white h-12 flex items-center px-2 rounded-md  border-slate-300 border-2 text-slate-800 justify-between bg-slate-500"
              style={{
                background: `linear-gradient(to right, rgb(100 116 139 / var(--tw-bg-opacity)) ${percentageOf(
                  count ?? 0
                )}, #e2e8f0 ${percentageOf(count ?? 0)})`,
              }}
            >
              <span>{value}</span>
              {percentageOf(count ?? 0)}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/">
        <Button className="mt-4">돌아가기</Button>
      </Link>
    </div>
  );
};

export default VoteResult;
