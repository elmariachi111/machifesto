import {
  ColumnType,
  Generated,
  Insertable,
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
  message_signature: string | null;

  created_at: ColumnType<Date, string | undefined, never>;
}

export type Signer = Selectable<SignerTable>;
export type NewSigner = Insertable<SignerTable>;
export type SignerUpdate = Updateable<SignerTable>;
