"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

interface user {
  name: string;
  userName: string;
  imageUrl: string;
  email: string;
  bio: string | null;
  portfolioWebsite: string | null;
}

export async function CreateUser(values: user, userId?: string) {
  if (!userId) return;

  await db.user.create({
    data: {
      userId: userId,
      bio: values.bio,
      name: values.name,
      portfolioWebsite: values.portfolioWebsite,
      userName: values.userName,
      email: values.email,
      imageUrl: values.imageUrl,
    },
  });
  revalidatePath("/", "layout");
}

export async function DeleteUser() {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  await db.user.delete({
    where: {
      userId: CurrentUser.id,
    },
  });
  revalidatePath("/", "layout");
}

export async function EditUser(values: user, use: "webhook" | "userUpdate") {
  const CurrentUser = await currentUser();
  if (!CurrentUser) return;

  if (use === "webhook") {
    await db.user.update({
      data: {
        name: values.name,
        userName: values.userName,
        email: values.email,
        imageUrl: values.imageUrl,
      },
      where: {
        userId: CurrentUser.id,
      },
    });
  } else {
    await db.user.update({
      data: {
        portfolioWebsite: values.portfolioWebsite,
        bio: values.bio,
        name: values.name,
        userName: values.userName,
      },
      where: {
        userId: CurrentUser.id,
      },
    });
  }

  revalidatePath("/", "layout");
}
