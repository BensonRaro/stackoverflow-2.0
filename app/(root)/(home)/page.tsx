import Link from "next/link";

import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/NoResult";
import { FetchQuestions } from "@/actions/FetchQuestions";
import PaginationHome from "@/components/Pagination";
import { db } from "@/lib/db";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import MobileFilter from "@/components/filter/MobileFilter";
import HomeFilters from "@/components/filter/HomeFilters";
import { HomePageFilters } from "@/constants/filters";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
    filter: string;
    q: string;
  };
}) {
  const question = await db.question.findMany();

  const result = await FetchQuestions(
    10,
    searchParams.page,
    searchParams.filter,
    searchParams.q
  );

  return (
    <>
      {result.length > 0 && (
        <>
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="h1-bold text-dark100_light900">All Questions</h1>
            <Link
              href="/askQuestion"
              className="flex justify-end max-sm:w-full"
            >
              <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                Ask a Question
              </Button>
            </Link>
          </div>
          <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
            <LocalSearchbar
              route="/"
              iconPosition="left"
              imgSrc="/assets/icons/search.svg"
              placeholder="Search for questions"
              otherClasses="flex-1"
            />
            <MobileFilter
              filters={HomePageFilters}
              otherClasses="min-h-[56px] sm:min-w-[170px]"
              containerClasses="hidden max-md:flex"
            />
          </div>
          <HomeFilters filters={HomePageFilters} />
        </>
      )}

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.length > 0 ? (
          <>
            {result.map(async (question) => {
              const user = await db.user.findUnique({
                where: {
                  userId: question.userId,
                },
              });
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  answers={question.answer}
                  user={user}
                  tags={question.tags}
                  Upvotes={question.upvotes}
                />
              );
            })}
            {result.length > 10 && (
              <div className="mt-10">
                <PaginationHome
                  page={searchParams.page}
                  questions={question.length}
                />
              </div>
            )}
          </>
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/askQuestion"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
