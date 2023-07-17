"use server";

import UserModel from "@/models/UserModel";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "@/utils/token";
import sendEmail from "@/utils/sendEmail";

const BASE_URL = process.env.NEXTAUTH_URL;

export const UpdateUser = async ({ name, image }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");
    const user = await UserModel.findByIdAndUpdate(
      session?.user?._id,
      {
        name,
        image,
      },
      { new: true }
    ).select("-password");
    if (!user) throw new Error("Email dose not exist!");
    return { msg: "Update Profile Successfully" };
  } catch (error) {
    redirect(`/error?error=${error.message}`);
  }
};

export const signUpWithCredentials = async (data) => {
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (user) throw new Error("Email already exists!");

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const token = generateToken({ user: data });
    console.log({ data });

    await sendEmail({
      to: data.email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: "VERIFY EMAIL",
    });

    return {
      msg: "Sign Up Success! Check your email to complete the registration.",
    };
  } catch (error) {
    redirect(`/errors?error=${error.message}`);
  }
};

export const verifyWithCredentials = async (token) => {
  try {
    const { user } = verifyToken(token);

    const userExist = await UserModel.findOne({ email: user.email });
    if (userExist) return { msg: "Verify Success!" };

    const newUser = new UserModel(user);

    await newUser.save();

    console.log({ newUser });
    return { msg: "Verify Success!" };
  } catch (error) {
    redirect(`/errors?error=${error.message}`);
  }
};

export const ChangePasswordWithCredentials = async ({
  old_password,
  new_password,
}) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized!");
    if (session?.user?.provider !== "credentials") {
      throw new Error(
        `This account is signed in with ${session?.user?.provider}. You can't use this function!`
      );
    }
    const user = await UserModel.findById(session?.user?._id);
    if (!user) throw new Error("User does not exist!");
    const compare = await bcrypt.compare(old_password, user.password);
    if (!compare) throw new Error("Old password does not match!");

    const newPass = await bcrypt.hash(new_password, 12);
    await UserModel.findByIdAndUpdate(user._id, { password: newPass });

    return { msg: "Change Password Successfully!" };
  } catch (error) {
    redirect(`/errors?error=${error.message}`);
  }
};

export const ForgotPasswordWithCredentials = async ({ email }) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Email does not exist!");

    if (user?.provider !== "credentials") {
      throw new Error(
        `This account is signed in with ${user?.provider}. You can't use this function!`
      );
    }
    const token = generateToken({ userId: user._id });

    await sendEmail({
      to: email,
      url: `${BASE_URL}/reset_password?token=${token}`,
      text: "RESET PASSWORD",
    });

    return { msg: "Success! Check your email to reset your password." };
  } catch (error) {
    redirect(`/errors?error=${error.message}`);
  }
};
export const ResetPasswordWithCredentials = async ({ token, password }) => {
  try {
    const { userId } = verifyToken(token);
    const newPass = await bcrypt.hash(password, 12);
    await UserModel.findByIdAndUpdate(userId, { password: newPass });
    return { msg: "Success! Your password has been reset." };
  } catch (error) {
    redirect(`/errors?error=${error.message}`);
  }
};
