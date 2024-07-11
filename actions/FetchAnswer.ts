"use server";

import { db } from "@/lib/db";

export async function FetchAnswer(page: number, filter: string) {
  const pageNo = page ? page : 0;

  const answers = await db.answer.findMany({
    skip: 10 * Number(pageNo),
    take: 10,
    include: {
      downvotes: true,
      upvotes: true,
    },
    orderBy: {
      createdAt:
        filter === "recent" ? "desc" : filter === "old" ? "asc" : "desc",
    },
  });

  let sortedQuestions;
  if (filter === "recent" || filter === "old") {
    return answers;
  } else if (filter === "highestupvotes") {
    sortedQuestions = answers.sort(
      (a, b) => b.upvotes.length - a.upvotes.length
    );
    return sortedQuestions;
  } else if (filter === "lowestupvotes") {
    sortedQuestions = answers.sort(
      (a, b) => a.upvotes.length - b.upvotes.length
    );
    return sortedQuestions;
  } else {
    return answers;
  }
}
