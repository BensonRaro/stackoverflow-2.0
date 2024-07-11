"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function FetchQuestions(
  limit: number,
  page: number,
  filter: string,
  query?: string
) {
  const CurrentUser = await currentUser();

  const pageNo = page ? page : 0;

  const Question = await db.question.findMany({
    skip: limit * Number(pageNo),
    take: limit,
    include: {
      tags: true,
      answer: true,
      downvotes: true,
      saves: true,
      upvotes: true,
    },
    where: {
      title: {
        contains: query,
      },
    },
    orderBy: {
      createdAt: filter === "newest" ? "desc" : "asc",
    },
  });
  // console.log(page, pageNo);
  // console.log(offset);
  const Tags = await db.tag.findMany({
    where: {
      userId: CurrentUser?.id,
      questionId: null,
    },
  });
  // console.log(Tags);

  const tagNames = Tags.map((tag) => tag.tag);
  // console.log(tagNames);

  const enhancedQuestions = Question.map((question) => {
    const QuestionTags = question.tags.filter(
      (tag) => tag.questionId === question.id
    );
    const Results = {
      ...question,
      hasUserTag: QuestionTags.some((tag) => tagNames.includes(tag.tag)),
    };
    return Results;
  });

  // Final sorting based on the filter
  let sortedQuestions;
  if (filter === "upvotes") {
    sortedQuestions = enhancedQuestions.sort(
      (a, b) => b.upvotes.length - a.upvotes.length
    );
  } else if (filter === "recommended" || !filter) {
    sortedQuestions = enhancedQuestions.sort((a, b) => {
      // Sort by user tags first
      if (a.hasUserTag && !b.hasUserTag) {
        return -1;
      }
      if (!a.hasUserTag && b.hasUserTag) {
        return 1;
      }
      // If both have or do not have user tags, retain the original order
      return 0;
    });
  } else if (filter === "unanswered") {
    sortedQuestions = enhancedQuestions.sort(
      (a, b) => b.answer.length - a.answer.length
    );
  } else {
    return Question;
  }

  if (filter === "newest") {
    return Question;
  } else {
    return sortedQuestions;
  }
}
