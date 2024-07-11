"use server";

import { answer, downvote, question, saved, tag, upvote } from "@prisma/client";

export async function FetchQuestions(
  filter: string,
  Tags: tag[],
  Question:
    | (question & {
        tags: tag[];
        upvotes: upvote[];
        saves: saved[];
        downvotes: downvote[];
        answer: answer[];
      })[]
    | null
) {
  const tagNames = Tags.map((tag) => tag.tag);
  // console.log(tagNames);

  const enhancedQuestions = Question?.map((question) => {
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
    sortedQuestions = enhancedQuestions?.sort(
      (a, b) => b.upvotes.length - a.upvotes.length
    );
  } else if (filter === "recommended" || !filter) {
    sortedQuestions = enhancedQuestions?.sort((a, b) => {
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
    sortedQuestions = enhancedQuestions?.sort(
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
