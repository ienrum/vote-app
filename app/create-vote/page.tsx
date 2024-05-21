"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/supabase";
import { Option } from "@/app/vote/[id]/page";

type VoteData = TablesInsert<"votes">;

export default function CreateVote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<Option[]>([
    {
      id: "0",
      value: "",
    },
    {
      id: "1",
      value: "",
    },
  ]);
  const router = useRouter();

  const addOption = () => {
    const newOptions: Option[] = [...options];
    newOptions.push({
      id: newOptions.length.toString(),
      value: "",
    });
    setOptions(newOptions);
  };

  const handleChangeOption = (index: number, value: string) => {
    const newOptions: Option[] = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const voteData: VoteData = {
      title,
      description,
      options: JSON.stringify(options),
    };
    const { data, error } = await supabase
      .from("votes")
      .insert([voteData]) // get fastest timestamp
      .select("*")
      .single();

    if (error) {
      alert("투표 생성에 실패했습니다.");
      return;
    }
    router.push(`/vote/${(data as VoteData).id}`);
  };

  return (
    <Card className="mt-8">
      <h1>투표 생성</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <Label htmlFor="title">투표 제목:</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 mb-4"
        />

        <Label htmlFor="description">설명:</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-2 mb-4"
        />

        <Label>투표 옵션:</Label>
        {options.map((option, index) => (
          <Input
            key={index}
            value={option.value}
            onChange={(e) => handleChangeOption(index, e.target.value)}
            required
            className="mt-2 mb-2"
          />
        ))}

        <Button type="button" onClick={addOption} className="mt-4">
          옵션 추가
        </Button>
        <Button type="submit" className="mt-4">
          투표 생성
        </Button>
      </form>
    </Card>
  );
}
