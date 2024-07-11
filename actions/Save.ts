"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function save(questionId: string) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  await db.saved.create({
    data: {
      questionId: questionId,
      userId: CurrentUser.id,
    },
  });

  revalidatePath("/", "layout");
}

export async function UnSave(id: string | undefined) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (!id) return;

  await db.saved.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/", "layout");
}
