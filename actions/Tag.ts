"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function AddTag(value: string) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  await db.tag.create({
    data: {
      userId: CurrentUser.id,
      tag: value,
    },
  });
  revalidatePath("/", "layout");
}

export async function DeleteTag(Id: string | undefined) {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;
  if (!Id) return;

  await db.tag.delete({
    where: {
      id: Id,
    },
  });
  revalidatePath("/", "layout");
}
