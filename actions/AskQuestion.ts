"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

import { QuestionsSchema } from "@/lib/validations";
import { Drizzle } from "@/drizzle";
import { Question, Tags, Users } from "@/drizzle/Schema";

export async function AskQuestion(values: z.infer<typeof QuestionsSchema>) {
  const db = await Drizzle();
  // console.log(values.tags);
  // await db.insert(Users).values({
  //   id: "yttcfgvhjnkhuy",
  //   clerkId: "tffyghuj",
  //   bio: "",
  //   email: "",
  //   location: "",
  //   name: "",
  //   picture: "",
  //   portfolioWebsite: "",
  //   reputation: 0,
  //   username: "",
  // });

  let id = uuidv4();
  await db.insert(Question).values({
    id: id,
    title: values.title,
    explanation: values.explanation,
    clerkId: "tffyghuj",
  });

  for (const tag of values.tags) {
    await db.insert(Tags).values({
      id: uuidv4(),
      clerkId: "tffyghuj",
      tag: tag.text,
      questionId: id,
    });
  }

  revalidatePath("/", "layout");
}
