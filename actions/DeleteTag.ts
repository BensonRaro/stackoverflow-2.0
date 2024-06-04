"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { Drizzle } from "@/drizzle";
import { Tags } from "@/drizzle/Schema";

export async function DeleteTag(Id: string | undefined) {
  if (!Id) return;
  const db = await Drizzle();

  await db.delete(Tags).where(eq(Tags.id, Id));
  revalidatePath("/", "layout");
}
