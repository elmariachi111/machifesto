import NextAuth, { DefaultSession } from "next-auth";
import Twitter from "next-auth/providers/twitter";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      accessToken: string;
      userName: string;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Twitter],

  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.userId = account.providerAccountId;
      }
      if (profile) {
        //@ts-ignore
        token.userName = profile.data.username;
      }

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken as string,
          userName: token.userName as string,
          id: token.userId as string,
        },
      };
    },
  },
});
