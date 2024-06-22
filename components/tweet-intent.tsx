"use client";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";

import SubmitButton from "./submit-button";

import addRetweet from "@/components/actions/addRetweet";

export default function TweetIntent() {
  const [response, formAction] = useFormState(addRetweet, null);
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
        href="https://twitter.com/intent/retweet?tweet_id=463440424141459456"
        title="Repost this tweet"
      >
        Repost this as {session.data?.user?.name}
      </Link>
      <form
        action={formAction}
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
      <div className="text-xs">action response: {response}</div>
    </div>
  );
}
