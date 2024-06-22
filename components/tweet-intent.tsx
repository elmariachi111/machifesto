"use client";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";

import SubmitButton from "./submit-button";
import addRepost from "./actions/addRepost";

import addUser from "@/components/actions/addUser";
import { REPOST_TWEET_INTENT } from "@/config/constants";

export default function TweetIntent() {
  const [, repostAction] = useFormState(addRepost, null);
  const [userResponse, addUserAction] = useFormState(addUser, null);

  const session = useSession();

  if (!session) {
    return <p>not signed in</p>;
  }

  return (
    <div className="flex flex-col w-8/12  items-center ">
      <Link
        isExternal
        className="flex items-center text-large py-4"
        color="primary"
        href={REPOST_TWEET_INTENT}
        title="Repost this tweet"
        onClick={() => addUserAction()}
      >
        Repost this as {session.data?.user?.name}
      </Link>
      <form
        action={repostAction}
        className="flex flex-wrap md:flex-nowrap gap-4 w-full items-center"
      >
        <Input
          className="w-full"
          label="Optional: Quote Post URL"
          name="retweet-url"
          placeholder="Add your Repost URL here"
          type="url"
        />
        <SubmitButton />
      </form>

      <div className="text-xs">
        action response: {userResponse ? userResponse.id : ""}
      </div>
    </div>
  );
}
