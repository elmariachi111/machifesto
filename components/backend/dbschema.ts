import { SignedOffchainAttestation } from "@ethereum-attestation-service/eas-sdk";
import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  signers: SignerTable;
}

export interface SignerTable {
  id: Generated<string>;

  user_name: string;
  profile_picture_url: string;
  twitter_handle: string;
  twitter_id: string;

  repost_url: string | null;

  ethereum_address: string | null;
  attestation: JSONColumnType<SignedOffchainAttestation> | null;

  created_at: ColumnType<Date, string | undefined, never>;
}

export type Signer = Selectable<SignerTable>;
export type NewSigner = Insertable<SignerTable>;
export type SignerUpdate = Updateable<SignerTable>;
