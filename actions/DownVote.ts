"use server";

import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DownVote(id: string, use: "answer" | "question") {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (use === "question") {
    await db.downvote.create({
      data: {
        questionId: id,
        userId: CurrentUser.id,
      },
    });
  } else {
    await db.downvote.create({
      data: {
        answerId: id,
        userId: CurrentUser.id,
      },
    });
  }

  revalidatePath("/", "layout");
}

export async function DeleteDownVote(id: string | undefined) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (!id) return;
  await db.downvote.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/", "layout");
}
