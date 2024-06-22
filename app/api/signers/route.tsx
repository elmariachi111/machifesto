import { NextResponse } from "next/server";

import { db } from "@/components/backend/db";

export async function GET() {
  const result = await db
    .selectFrom("signers")
    .select([
      "id",
      "profile_picture_url",
      "user_name",
      "twitter_id",
      "twitter_handle",
      "created_at",
    ])
    .orderBy("created_at", "desc")
    .execute();

  return NextResponse.json(result);
}
