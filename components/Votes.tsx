"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { UnSave, save } from "@/actions/Save";
import { UnUpvote, Upvotefn } from "@/actions/Upvote";
import { DeleteDownVote, DownVote } from "@/actions/DownVote";
import { downvote, saved, upvote } from "@prisma/client";

interface Props {
  type: "answer" | "question";
  itemId: string;
  userId: string | undefined;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  saved?: saved[];
  Downvotes: downvote[];
  Upvotes: upvote[];
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  saved,
  Downvotes,
  Upvotes,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const hasSaved = saved?.some(
    (item) => item.userId === userId && item.questionId === itemId
  );
  // console.log(hasSaved);
  const use = type === "answer" ? "answer" : "question";
  const handleSave = async () => {
    if (hasSaved) {
      const SavedByUser = saved?.find(
        (item) => item.userId === userId && item.questionId === itemId
      );
      await UnSave(SavedByUser?.id);
    } else {
      await save(itemId);
    }

    return toast({
      title: `Question ${
        !hasSaved ? "Saved in" : "Removed from"
      } your collection`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) {
      return toast({
        title: "Please log in",
        description: "You must be logged in to perform this action",
      });
    }

    if (action === "upvote") {
      if (!hasupVoted) {
        if (hasdownVoted) {
          const DownvotesResults = Downvotes?.find(
            (item) => item.userId === userId
          );
          await DeleteDownVote(DownvotesResults?.id);

          await Upvotefn(itemId, use);
        } else {
          await Upvotefn(itemId, use);
        }
      } else {
        const upvotesResults = Upvotes?.find((item) => item.userId === userId);
        await UnUpvote(upvotesResults?.id);
      }
      return toast({
        title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
        variant: !hasupVoted ? "default" : "destructive",
      });
    }

    if (action === "downvote") {
      if (!hasdownVoted) {
        if (hasupVoted) {
          const upvotesResults = Upvotes?.find(
            (item) => item.userId === userId
          );
          await UnUpvote(upvotesResults?.id);
          await DownVote(itemId, use);
        } else {
          await DownVote(itemId, use);
        }
      } else {
        const DownvotesResults = Downvotes?.find(
          (item) => item.userId === userId
        );
        await DeleteDownVote(DownvotesResults?.id);
      }

      return toast({
        title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
