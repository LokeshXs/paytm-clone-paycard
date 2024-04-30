"use server";

import { SignUpSchema, SignInSchema } from "@repo/schemas/authenticationSchema";
import { z } from "zod";
import db from "../lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";

export async function signUp(values: z.infer<typeof SignUpSchema>) {
  try {
    // 1. validate the fields using zod

    const validatedFields = SignUpSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Invalid fields!",
      };
    }

    const { email, password, fullname, phonenumber } = validatedFields.data;

    // 2.) check if a user with same email or phone number exists

    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phonenumber,
          },
        ],
      },
    });

    if (user) {
      return {
        status: "error",
        message: "User with email or phone number exists!",
      };
    }

    // 3.)Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // 4.) create user with hashed password

    const newUser = await db.user.create({
      data: {
        name: fullname,
        email,
        phonenumber,
        password: hashPassword,
      },
    });


    // Initialising the user with Zero balance
    await db.balance.create({
      data: {
        userId: newUser.id,
        amount: 0,
        locked: 0,
      },
    });

    return {
      status: "success",
      message: "Signed up successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}

export async function signInAction(values: z.infer<typeof SignInSchema>) {
  console.log(values);

  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid fields!",
    };
  }

  const { phonenumber, password } = validatedFields.data;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        phonenumber,
      },
    });

    if (!existingUser || !existingUser.password) {
      return {
        status: "error",
        message: "User not found!",
      };
    }

    await signIn("credentials", {
      phonenumber,
      password,
      redirectTo: "/",
    });

    return {
      status: "success",
      message: "Successfully Signed in",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "User not found!",
          };

        case "OAuthAccountNotLinked":
          return {
            status: "error",
            message: "Account is already exists with the email",
          };

        default:
          return {
            status: "error",
            message: "Something went wrong!",
          };
      }
    }

    throw error;
  }
}
