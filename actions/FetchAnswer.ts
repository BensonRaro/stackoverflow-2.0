"use server";

import { answer, downvote, upvote, user } from "@prisma/client";

export async function FetchAnswer(
  filter: string,
  answers:
    | (answer & {
        upvotes: upvote[];
        downvotes: downvote[];
        user: user;
      })[]
    | null
) {
  let sortedQuestions;
  if (filter === "recent" || filter === "old") {
    return answers;
  } else if (filter === "highestupvotes") {
    sortedQuestions = answers?.sort(
      (a, b) => b.upvotes.length - a.upvotes.length
    );
    return sortedQuestions;
  } else if (filter === "lowestupvotes") {
    sortedQuestions = answers?.sort(
      (a, b) => a.upvotes.length - b.upvotes.length
    );
    return sortedQuestions;
  } else {
    return answers;
  }
}
