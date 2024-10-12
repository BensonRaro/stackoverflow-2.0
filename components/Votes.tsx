"use client";

import Image from "next/image";
import { useTransition } from "react";
import { downvote, saved, upvote } from "@prisma/client";

import { formatAndDivideNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { UnSave, save } from "@/actions/Save";
import { UnUpvote, Upvotefn } from "@/actions/Upvote";
import { DeleteDownVote, DownVote } from "@/actions/DownVote";

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
  const [pending, startTranstion] = useTransition();
  const hasSaved = saved?.some(
    (item) => item.userId === userId && item.questionId === itemId
  );
  // console.log(hasSaved);
  const use = type === "answer" ? "answer" : "question";
  const handleSave = () => {
    if (!userId) {
      return toast({
        title: "Please log in",
        description: "You must be logged in to perform this action",
      });
    }
    startTranstion(async () => {
      if (hasSaved) {
        const SavedByUser = saved?.find(
          (item) => item.userId === userId && item.questionId === itemId
        );
        await UnSave(SavedByUser?.id)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      } else {
        await save(itemId)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleVote = (action: "upvote" | "downvote") => {
    if (!userId) {
      return toast({
        title: "Please log in",
        description: "You must be logged in to perform this action",
      });
    }
    if (action === "upvote") {
      startTranstion(async () => {
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
          const upvotesResults = Upvotes?.find(
            (item) => item.userId === userId
          );
          await UnUpvote(upvotesResults?.id);
        }
      });
    }

    if (action === "downvote") {
      startTranstion(async () => {
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
      });
    }
  };

  return (
    <div className="flex gap-5">
      {/* votes */}
      <div className="flex-center gap-2.5">
        {/* upvotes */}
        <div className="flex-center gap-1.5">
          <Button
            onClick={() => handleVote("upvote")}
            disabled={pending}
            variant={"ghost"}
          >
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
            />
          </Button>

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        {/* downvotes */}
        <div className="flex-center gap-1.5">
          <Button
            onClick={() => handleVote("downvote")}
            disabled={pending}
            variant={"ghost"}
          >
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
            />
          </Button>

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {/* saved */}
      {type === "question" && (
        <Button disabled={pending} onClick={handleSave} variant={"ghost"}>
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
          />
        </Button>
      )}
    </div>
  );
};

export default Votes;
