"use client";

import { ButtonHTMLAttributes, KeyboardEvent, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createVotePostAction } from "@/app/actions";
import { CardTitle } from "@/components/ui/card";
import { useFormStatus } from "react-dom";

interface Option {
  value: string;
}

interface SubmitProps extends ButtonHTMLAttributes<"button"> {}

const Submit = ({ type }: SubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type={type} className="mt-4 bg-gray-700" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
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
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step >= 2) {
      const newOptions: Option[] = [...options];
      newOptions.push({
        value: "",
      });
      setOptions(newOptions);
    }
    setStep((step) => step + 1);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const handleChangeOption = (index: number, value: string) => {
    const newOptions: Option[] = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  return (
    <>
      <CardTitle>Create a Vote</CardTitle>
      <form
        action={createVotePostAction}
        className="mt-4"
        onKeyDown={handleKeyDown}
      >
        <Label htmlFor="title">Title :</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 mb-4"
        />

        {step >= 1 && (
          <>
            <Label htmlFor="description">Description :</Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 mb-4"
            />
          </>
        )}

        {step >= 2 && (
          <>
            <Label>Options :</Label>
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
          </>
        )}

        <div className="flex justify-between">
          <Button type="button" onClick={nextStep} className="mt-4">
            {step >= 2 ? "Add Option" : "Next step"}
          </Button>
          {step >= 2 && <Submit type={step >= 2 ? "submit" : "button"} />}
        </div>
      </form>
    </>
  );
};

export default VoteForm;
