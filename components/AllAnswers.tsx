import { answer, downvote, upvote } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

import { getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/ParseHTML";
import PaginationHome from "@/components/Pagination";
import Votes from "@/components/Votes";
import { db } from "@/lib/db";
import { AnswerFilters } from "@/constants/filters";
import MobileFilter from "@/components/filter/MobileFilter";
import HomeFilters from "@/components/filter/HomeFilters";
import { FetchAnswer } from "@/actions/FetchAnswer";
import NoResult from "./NoResult";

interface Props {
  totalAnswers: number;
  page: number;
  filter: string;
  answers:
    | (answer & {
        upvotes: upvote[];
        downvotes: downvote[];
      })[]
    | null;
}

const AllAnswers = async ({ totalAnswers, page, filter, answers }: Props) => {
  const ClerkUser = await currentUser();

  const result = await FetchAnswer(filter, answers);

  if (!result) return;

  return (
    <div className="mt-2">
      {totalAnswers === 0 ? (
        <NoResult
          title="There’s no answers to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        />
      ) : (
        <div className="flex items-center justify-between">
          <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        </div>
      )}
      {result.length > 0 && (
        <>
          <div className="mt-11 gap-5 max-sm:flex-col sm:items-center">
            <MobileFilter
              filters={AnswerFilters}
              otherClasses="min-h-[56px] sm:min-w-[170px]"
              containerClasses="hidden max-md:flex"
            />
          </div>
          <HomeFilters filters={AnswerFilters} />
        </>
      )}

      <div className="mb-10">
        {result.map(async (answer) => {
          const user = await db.user.findUnique({
            where: {
              userId: answer.userId,
            },
          });

          return (
            <article key={answer.id} className="light-border border-b py-10">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.userId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={user?.imageUrl ? user?.imageUrl : ""}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {user?.name}
                    </p>

                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    itemId={answer.id}
                    userId={ClerkUser?.id}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.some(
                      (item) => item.userId === ClerkUser?.id
                    )}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.some(
                      (item) => item.userId === ClerkUser?.id
                    )}
                    Downvotes={answer.downvotes}
                    Upvotes={answer.upvotes}
                  />
                </div>
              </div>
              <ParseHTML data={answer.answer} />
            </article>
          );
        })}
      </div>
      {totalAnswers > 10 && (
        <div className="w-full">
          <PaginationHome page={page} length={totalAnswers} />
        </div>
      )}
    </div>
  );
};

export default AllAnswers;
