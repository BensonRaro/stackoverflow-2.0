"use server";

import { Drizzle } from "@/drizzle";

export async function FetchQuestions(limit: number, page: number) {
  const db = await Drizzle();

  const Question = await db.query.Question.findMany({
    orderBy: (question, { asc }) => asc(question.createdAt),
    limit: limit,
    offset: (page - 1) * limit,
  });

  const Tags = await db.query.Tags.findMany({
    where: (tag, { eq }) => eq(tag.clerkId, "tffyghuj"),
  });

  const AllTags = await db.query.Tags.findMany();

  const userTags = Tags.filter((tag) => tag.questionId === "");

  const tagName = userTags.map((tag) => tag.tag);

  const enhancedQuestions = Question.map((question) => {
    const QuestionTags = AllTags.filter(
      (tag) => tag.questionId === question.id
    );
    const Results = {
      ...question,
      hasUserTag: QuestionTags.some((tag) => tagName.includes(tag.tag)),
    };
    return Results;
  });

  // Sort the questions: those with user tags come first
  const sortedQuestions = enhancedQuestions.sort((a, b) => {
    // Both or neither have user tags: retain original order (stable sort)
    if (a.hasUserTag === b.hasUserTag) {
      return 0;
    }
    // A has user tags, B does not
    if (a.hasUserTag) {
      return -1;
    }
    // B has user tags, A does not
    return 1;
  });
  return sortedQuestions;
}
