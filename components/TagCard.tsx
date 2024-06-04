"use client";

import { X } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { DeleteTag } from "@/actions/DeleteTag";
import { Badge } from "./ui/badge";

const TagCard = ({
  tag,
  use,
  id,
}: {
  tag: string | null;
  use: "Home" | "RightSidebar" | "QDetails";
  id?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      DeleteTag(id)
        .then(() => {
          toast("Tag Deleted");
        })
        .catch((error) => {
          toast("Something Went Wrong");
          console.log(error);
        });
    });
  };
  return (
    <div className="flex justify-between gap-2">
      <Badge className="dark:bg-primary/10 bg-primary/30 hover:bg-primary/30 text-accent-foreground rounded-md border-none px-4 py-2 text-base font-semibold">
        {tag}
      </Badge>
      {use === "RightSidebar" && (
        <Button
          type="button"
          variant="ghost"
          className="p-1"
          size={"icon"}
          disabled={isPending}
          onClick={onClick}
        >
          <X className="size-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" />
        </Button>
      )}
    </div>
  );
};

export default TagCard;
