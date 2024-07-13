"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

import { QuestionsSchema } from "@/lib/validations";
import { db } from "@/lib/db";

export async function AskQuestion(values: z.infer<typeof QuestionsSchema>) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  const question = await db.question.create({
    data: {
      title: values.title,
      explanation: values.explanation,
      userId: CurrentUser.id,
    },
  });

  const tags = values.tags.map((tag) => ({
    userId: CurrentUser.id,
    tag: tag.text,
    questionId: question.id,
  }));

  await db.tag.createMany({
    data: tags,
  });

  revalidatePath("/", "layout");
}

export async function DeleteQuestion(Id: string | undefined) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (!Id) return;

  await db.question.delete({
    where: {
      id: Id,
    },
  });
  revalidatePath("/", "layout");
}

export async function EditQuestion(
  values: z.infer<typeof QuestionsSchema>,
  Id: string | undefined
) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (!Id) return;

  const question = await db.question.update({
    data: {
      title: values.title,
      explanation: values.explanation,
    },
    where: {
      id: Id,
    },
  });

  await db.tag.deleteMany({
    where: {
      questionId: question.id,
    },
  });

  const tagsUpdate = values.tags.map((tag) => ({
    userId: CurrentUser.id,
    tag: tag.text,
    questionId: question.id,
  }));

  await db.tag.createMany({
    data: tagsUpdate,
  });

  revalidatePath("/", "layout");
}
