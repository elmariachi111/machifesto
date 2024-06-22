"use server";
import { revalidatePath } from "next/cache";

export default async function addRepost(
  previousState: string | undefined | null,
  formData: FormData,
) {
  "use server";

  const url = formData.get("retweet-url");

  console.log("MOO", url);
  revalidatePath("/");

  return "ok";
}
