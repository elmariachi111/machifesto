import { NextResponse } from "next/server";

import { db } from "@/components/backend/db";

export const dynamic = "force-dynamic";

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
      "ethereum_address",
      "attestation",
    ])
    .orderBy("created_at", "desc")
    .execute();

  return NextResponse.json(result);
}
