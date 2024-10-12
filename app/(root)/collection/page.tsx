import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import MobileFilter from "@/components/filter/MobileFilter";
import { SavedPageFilters } from "@/constants/filters";
import { db } from "@/lib/db";
import PaginationHome from "@/components/CustomPagination";
import NoResult from "@/components/NoResult";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
    filter: string;
    q: string;
  };
}) {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/");
  }

  const question = await db.question.findMany();

  const pageNo = searchParams.page ? searchParams.page : 0;

  const saved = await db.saved.findMany({
    skip: 10 * Number(pageNo),
    take: 10,
    include: {
      question: {
        include: {
          tags: true,
          answer: true,
          downvotes: true,
          saves: true,
          upvotes: true,
        },
      },
    },
    where: {
      question: {
        title: {
          contains: searchParams.q,
        },
      },
    },
    orderBy: {
      createdAt: searchParams.filter === "recent" ? "desc" : "asc",
    },
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <MobileFilter
          filters={SavedPageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {saved?.length! > 0 ? (
          <>
            {saved?.map(async (saved) => {
              const user = await db.user.findUnique({
                where: {
                  userId: saved.userId,
                },
              });
              return (
                <QuestionCard
                  key={saved.question.id}
                  question={saved.question}
                  answers={saved.question.answer}
                  user={user}
                  tags={saved.question.tags}
                  Upvotes={saved.question.upvotes}
                />
              );
            })}
            {saved?.length > 10 && (
              <div className="mt-10">
                <PaginationHome
                  page={searchParams.page}
                  length={question.length}
                />
              </div>
            )}
          </>
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/askQuestion"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
