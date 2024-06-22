import { Button } from "@nextui-org/button";

import { signIn } from "@/auth";
import { TwitterIcon } from "@/components/icons";
import { auth } from "@/auth";

const TwitterLogin = async () => {
  //const { data: session, status } = useSession();

  const session = await auth();

  // if (status === "authenticated") {
  //   return <p>Signed in as {session.user.email}</p>;
  // }

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

      <p>Welcome {session?.user?.name}</p>
    </>
  );
};

export default TwitterLogin;
