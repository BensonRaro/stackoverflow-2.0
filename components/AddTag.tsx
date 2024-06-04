"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { MdAddTask } from "react-icons/md";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddTag as Add } from "@/actions/AddTag";

const AddTag = () => {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;
    startTransition(() => {
      Add(value)
        .then(() => {
          toast("Tag Added");
          onClear();
        })
        .catch((error) => {
          toast("Something Went Wrong");
          console.log(error);
        });
    });
  };

  const onClear = () => {
    setValue("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full flex items-center shadow-lg mt-2"
    >
      <Input
        value={value}
        disabled={isPending}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        disabled={isPending}
        type="submit"
        variant="secondary"
        className="rounded-l-none"
      >
        <MdAddTask className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default AddTag;
