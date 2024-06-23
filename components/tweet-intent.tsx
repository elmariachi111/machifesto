"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";

import addRepost from "./actions/addRepost";

import addUser from "@/components/actions/addUser";
import { REPOST_TWEET_INTENT } from "@/config/constants";

export default function TweetIntent() {
  const [, repostAction] = useFormState(addRepost, null);
  const [userResponse, addUserAction] = useFormState(addUser, null);

  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <div className="flex flex-col w-8/12  items-center ">
      <div className="flex flex-col gap-2">
        <Button
          isExternal
          as={Link}
          color="primary"
          href={REPOST_TWEET_INTENT}
          radius="full"
          size="lg"
          title="Repost this tweet"
          onClick={() => addUserAction()}
        >
          Repost <b>this</b> tweet
        </Button>
        <p className="text-sm">as {session.data?.user?.name}</p>
      </div>
      {/* <form
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
      */}
    </div>
  );
}
