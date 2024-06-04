"use server";

import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

import { Drizzle } from "@/drizzle";
import { Tags, Users } from "@/drizzle/Schema";

export async function AddTag(value: string, questionId?: string) {
  const db = await Drizzle();
  //   await db.insert(Users).values({
  //     id: "yttcfgvhjnkhuy",
  //     clerkId: "tffyghuj",
  //     bio: "",
  //     email: "",
  //     location: "",
  //     name: "",
  //     picture: "",
  //     portfolioWebsite: "",
  //     reputation: 0,
  //     username: "",
  //   });
  await db.insert(Tags).values({
    id: uuidv4(),
    clerkId: "tffyghuj",
    tag: value,
    questionId: questionId ? questionId : "",
  });
  revalidatePath("/", "layout");
}
