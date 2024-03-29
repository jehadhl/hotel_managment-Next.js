import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GitHubProvider from "next-auth/providers/github";
import sanityClient from "./sanity";
import { SanityClient } from "sanity";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient as SanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(sanityClient as SanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      const userEmail = token.email;
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail }
      );
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj._id,
        },
      };
    },
  },
};
