import { Link } from "@nextui-org/link";

import { auth } from "@/auth";

export default async function SignoutLink() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <Link
      isExternal
      aria-label="logout"
      className="text-default-500 text-sm"
      href="/api/auth/signout"
    >
      sign out
    </Link>
  );
}
