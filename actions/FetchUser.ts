"use server";

import { answer, user } from "@prisma/client";

export async function FetchUser(
  filter: string,
  users:
    | (user & {
        answer: answer[];
      })[]
    | null
) {
  // Final sorting based on the filter
  let sortedQuestions;
  if (filter === "top_contributors") {
    sortedQuestions = users?.sort((a, b) => b.answer.length - a.answer.length);
  }
  if (filter === "new_users" || "old_users") {
    return users;
  }
}
