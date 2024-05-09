import NextAuth, { AuthError, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "@repo/schemas/authenticationSchema";
import db from "./src/lib/db";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** The user's postal address. */
    userId: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { phonenumber, password } = validatedFields.data;
        // 2.) check if the user exists

        const user = await db.user.findUnique({
          where: {
            phonenumber,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        //3.) compare password

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          return null;
        }

        // 4.) return user
        return user;
      },
    }),
    Google,
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session({ session, user, token }) {
      // console.log(token);
      session.userId = token.sub!;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/myaccount/dashboard";
    },

  },

  events: {
    async signIn({ isNewUser, user }) {
      // console.log("Is new user", isNewUser);

      if (isNewUser) {
        await db.balance.create({
          data: {
            userId: user.id!,
            amount: 0,
            locked: 0,
          },
        });
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  trustHost:true,
  secret:process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  
});
