"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createVotePostAction } from "@/app/create-vote/actions";
import { CardTitle } from "@/components/ui/card";
import { useFormStatus } from "react-dom";

interface Option {
  value: string;
}

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-4 bg-gray-700" disabled={pending}>
      {pending ? "투표 생성 중..." : "투표 생성"}
    </Button>
  );
};

const VoteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<Option[]>([
    {
      value: "",
    },
    {
      value: "",
    },
  ]);

  const addOption = () => {
    const newOptions: Option[] = [...options];
    newOptions.push({
      value: "",
    });
    setOptions(newOptions);
  };

  const handleChangeOption = (index: number, value: string) => {
    const newOptions: Option[] = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  return (
    <>
      <CardTitle>투표 생성</CardTitle>
      <form action={createVotePostAction} className="mt-4">
        <Label htmlFor="title">투표 제목:</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 mb-4"
        />

        <Label htmlFor="description">설명:</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-2 mb-4"
        />

        <Label>투표 옵션:</Label>
        {options.map((option, index) => (
          <Input
            key={index}
            name="option"
            value={option.value}
            onChange={(e) => handleChangeOption(index, e.target.value)}
            required
            className="mt-2 mb-2"
          />
        ))}

        <div className="flex justify-between">
          <Button type="button" onClick={addOption} className="mt-4">
            옵션 추가
          </Button>
          <Submit />
        </div>
      </form>
    </>
  );
};

export default VoteForm;
