import UserModel from "@/models/UserModel";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

connectDB();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", requered: true },
        password: { label: "Password", type: "password", requered: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // console.log(credentials);
        const user = await signInWithCredentials({ email, password });
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/errors",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.user.name = session.name;
        token.user.image = session.image;
      } else {
        // console.log({ token });
        const user = await getUserByEmail({ email: token.email });
        token.user = user;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*................................................*/

const signInWithOAuth = async ({ account, profile }) => {
  const user = await UserModel.findOne({ email: profile.email });

  if (user) return true; // signIn

  // if !user => sign up => sign in
  const newUser = new UserModel({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });
  await newUser.save();
  return true;
};

const getUserByEmail = async ({ email }) => {
  const user = await UserModel.findOne({ email }).select("-password");
  if (!user) throw new Error("Email Does not exist!");

  return { ...user._doc, _id: user._id.toString() };
};

const signInWithCredentials = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Email Does not exist!");

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("Password Does not match!");

  return { ...user._doc, _id: user._id.toString() };
};
