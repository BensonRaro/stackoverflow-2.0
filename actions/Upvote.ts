"use server";

import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function Upvotefn(id: string, use: "answer" | "question") {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;
  if (use === "question") {
    await db.upvote.create({
      data: {
        questionId: id,
        userId: CurrentUser.id,
      },
    });
  } else {
    await db.upvote.create({
      data: {
        answerId: id,
        userId: CurrentUser.id,
      },
    });
  }

  revalidatePath("/", "layout");
}

export async function UnUpvote(id: string | undefined) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;
  if (!id) return;

  await db.upvote.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/", "layout");
}
