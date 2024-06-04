import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Drizzle } from "@/drizzle";
import QuestionCard from "@/components/QuestionCard";
import NoResult from "@/components/NoResult";
import { FetchQuestions } from "@/actions/FetchQuestions";
import PaginationHome from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
  };
}) {
  const db = await Drizzle();
  const result = await FetchQuestions(10, searchParams.page);
  // console.log(result);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/askQuestion" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        localSearchBar filter
        {/* <LocalSearchbar 
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        /> */}
      </div>
      HomeFilters
      <div className="mt-10 flex w-full flex-col gap-6 border-t dark:border-muted">
        {result.length > 0 ? (
          result.map(async (question) => {
            const user = await db.query.Users.findFirst({
              where: (user, { eq }) => eq(user.clerkId, question.clerkId),
              with: {},
            });
            const tags = await db.query.Tags.findMany({
              where: (tag, { eq }) => eq(tag.questionId, question.id),
            });
            return (
              <QuestionCard
                key={question.id}
                question={question}
                user={user}
                tags={tags}
              />
            );
          })
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/askQuestion"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <PaginationHome />
      </div>
    </>
  );
}
