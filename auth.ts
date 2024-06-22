import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Twitter],
});
