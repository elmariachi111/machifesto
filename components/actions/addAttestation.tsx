"use server";
import { SignedOffchainAttestation } from "@ethereum-attestation-service/eas-sdk";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/components/backend/db";

export default async function addAttestation(
  attestation: SignedOffchainAttestation,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Invalid session");
  }

  const _attestation = JSON.stringify(attestation, (_, v) =>
    typeof v === "bigint" ? v.toString() : v,
  );

  let result = await db
    .updateTable("signers")
    .set({
      attestation: _attestation,
      ethereum_address: attestation.message.recipient,
    })
    .where("twitter_id", "=", session.user.twitterId)
    .executeTakeFirst();

  if (result.numUpdatedRows === 0n) {
    throw new Error("No rows updated");
  }

  revalidatePath("/");
  console.log("ADDED ATTESTATION", result);

  return "ok";
}
