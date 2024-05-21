"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/types/supabase";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({
  children,
  value,
  onChange,
}: React.PropsWithChildren<RadioGroupProps>) => {
  return (
    <div
      role="radiogroup"
      onChange={(e) => onChange((e.target as HTMLInputElement).value)}
    >
      {children}
    </div>
  );
};

type VoteData = Tables<"votes">;
export interface Option {
  id: string;
  value: string;
}

export default function Vote() {
  const { id } = useParams();
  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (id) {
      const fetchVote = async () => {
        const { data, error } = await supabase
          .from("votes")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          console.error(error);
        } else {
          setVoteData(data);
          setOptions(JSON.parse(data?.options as string));
        }
      };
      fetchVote();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`투표가 제출되었습니다: ${selectedOption}`);
    // 여기에 투표 결과를 저장하는 로직을 추가할 수 있습니다.
  };

  if (!voteData) {
    return <p>로딩 중...</p>;
  }

  return (
    <Card className="mt-8">
      <h1>{voteData.title}</h1>
      <p className="mt-4">{voteData.description}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        {options.map(({ id, value }, index) => (
          <Label key={index}>
            <Input type="radio" value={id} required />
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
