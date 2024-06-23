"use server";
import { revalidatePath } from "next/cache";
import { serialize } from "wagmi";
import { SignedOffchainAttestation } from "@ethereum-attestation-service/eas-sdk";

import { auth } from "@/auth";
import { db } from "@/components/backend/db";

export default async function addAttestation(
  attestation: SignedOffchainAttestation,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Invalid session");
  }

  const _attestation = serialize(attestation);

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
