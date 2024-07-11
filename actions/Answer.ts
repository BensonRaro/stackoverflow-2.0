"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function AnswerQuestion(questionId: string, answer: string) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  await db.answer.create({
    data: {
      questionId: questionId,
      userId: CurrentUser.id,
      answer: answer,
    },
  });

  revalidatePath("/", "layout");
}

export async function DeleteAnswer(Id: string | undefined) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (!Id) return;

  await db.answer.delete({
    where: {
      id: Id,
    },
  });
  revalidatePath("/", "layout");
}
