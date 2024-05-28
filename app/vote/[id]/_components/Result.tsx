import { getVoteOptions } from "@/app/apis/vote";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Tables } from "@/types/supabase";
import Link from "next/link";

interface VoteResultProps {
  data: Tables<"votes"> | null;
  voteId: string;
}

const VoteResult = async ({ data, voteId }: VoteResultProps) => {
  const { data: options, error } = await getVoteOptions(voteId);
  const totalCount = options?.reduce((acc, { count }) => acc + (count ?? 0), 0);
  const percentageOf = (count: number) =>
    `${((count / (totalCount ?? 1)) * 100).toFixed(0)}%`;

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <CardTitle>{data?.title}</CardTitle>
      <CardDescription className="mt-4">{data?.description}</CardDescription>
      <ul className="flex flex-col gap-4">
        {options?.map(({ id, value, count }) => (
          <li key={id} className="flex justify-start items-center ">
            <p
              className="w-full bg-slate-white h-12 flex items-center px-2 rounded-md  border-slate-300 border-2 text-slate-800 justify-between bg-white"
              style={{
                background: `linear-gradient(to right, rgb(203 213 225 / var(--tw-bg-opacity)) ${percentageOf(
                  count ?? 0
                )}, white ${percentageOf(count ?? 0)})`,
              }}
            >
              <span>
                {value} ({count}/{totalCount})
              </span>
              {percentageOf(count ?? 0)}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/">
        <Button className="mt-4">돌아가기</Button>
      </Link>
    </>
  );
};

export default VoteResult;
