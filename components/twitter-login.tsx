import { Button } from "@nextui-org/button";

import { signIn } from "@/auth";
import { TwitterIcon } from "@/components/icons";
import { auth } from "@/auth";

async function TwitterLogin() {
  //const { data: session, status } = useSession();

  const session = await auth();

  if (session?.user) {
    return null; //<p>Logged in as {session.user.name}</p>;
  }

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("twitter");
        }}
      >
        <Button color="primary" radius="full" type="submit">
          <TwitterIcon size={20} /> Login with X/Twitter
        </Button>
      </form>
    </>
  );
}

export default TwitterLogin;
