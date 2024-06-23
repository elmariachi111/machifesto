"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/components/backend/db";

export default async function addUser() {
  const session = await auth();

  if (!session?.user || !session?.user?.name || !session?.user?.image) {
    throw new Error("Invalid session");
  }

  let result = await db
    .insertInto("signers")

    .values({
      user_name: session.user.name,
      profile_picture_url: session.user.image,
      twitter_id: session.user.twitterId,
      twitter_handle: session.user.userName,
    })
    .onConflict((oc) => oc.doNothing())
    .returning(["id"])
    .executeTakeFirst();

  if (!result?.id) {
    result = await db
      .selectFrom("signers")
      .select(["id"])
      .where("twitter_id", "=", session.user.twitterId)
      .executeTakeFirstOrThrow();
  }

  revalidatePath("/");
  console.log("ADD USER RESULT", result);

  return result;
}
