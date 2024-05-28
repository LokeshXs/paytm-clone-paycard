"use server";

import { UpdateCustomProfileSchema } from "@repo/schemas/authenticationSchema";
import { z } from "zod";
import db from "../lib/db";
import { auth } from "../../auth";
import bcrypt from "bcryptjs";
import {Prisma} from "@prisma/client"

export const updateProfile = async (
  values: z.infer<typeof UpdateCustomProfileSchema>
) => {
    console.log(values);
  try {
    const session = await auth();

    const validatedValues = UpdateCustomProfileSchema.safeParse(values);

    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Values are not valid",
      };
    }

    const validatedValuesData: {
      name: string;
      phonenumber: string;
      email: string;
      password: string;
      [key: string]: string; // Index signature
    } = validatedValues.data;

    // 1.) Fetch the updatable fields from DB

    const userOriginalDetails: {
      name: string | null;
      phonenumber: string | null;
      email: string;
      password: string | null;
      [key: string]: string | null; // Index signature
    } | null = await db.user.findUnique({
      where: {
        id: session?.userId,
      },
      select: {
        name: true,
        email: true,
        password: true,
        phonenumber: true,
      },
    });

    const toBeUpdatedFields: any = {};

    for (let [key, value] of Object.entries(userOriginalDetails || {})) {
      if (userOriginalDetails) {
        if (key === "password") {
          const isValid = await bcrypt.compare(
            validatedValuesData["password"],
            userOriginalDetails["password"] || ""
          );

          if (!isValid && validatedValuesData["password"] !== "") {
            toBeUpdatedFields["password"] = validatedValuesData["password"];
          }
        } else {
          if (userOriginalDetails[key] !== validatedValuesData[key]) {
            toBeUpdatedFields[key] = validatedValuesData[key];
          }
        }
      }
    }



    //   2.) Update fields

    await db.user.update({
      where: {
        id: session?.userId,
      },
      data: toBeUpdatedFields,
    });

    return {
      status: "success",
      message: "Profile is updated successfully",
    };
  } catch (error) {

    console.log(error);

    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === "P2002"){
        return {
          status:"error",
          message:"User with the details already exist"
        }
      }
    }
    
    return {
      status: "error",
      message: "Something went wrong, try after sometime",
    };
  }
};




// ******************************************************************************

export const updateOAuthProfile = async (
    values: {number:string}
  ) => {
    try {
      const session = await auth();
  
      const validatedValues = UpdateCustomProfileSchema.safeParse(values);
  
      if (!validatedValues.success) {
        return {
          status: "error",
          message: "Values are not valid",
        };
      }
  
      const validatedValuesData: {
        name: string;
        phonenumber: string;
        email: string;
        password: string;
        [key: string]: string; // Index signature
      } = validatedValues.data;
  
      // 1.) Fetch the updatable fields from DB
  
      const userOriginalDetails: {
        name: string | null;
        phonenumber: string | null;
        email: string;
        password: string | null;
        [key: string]: string | null; // Index signature
      } | null = await db.user.findUnique({
        where: {
          id: session?.userId,
        },
        select: {
          name: true,
          email: true,
          password: true,
          phonenumber: true,
        },
      });
  
      const toBeUpdatedFields: any = {};
  
      for (let [key, value] of Object.entries(userOriginalDetails || {})) {
        if (userOriginalDetails) {
          if (key === "password") {
            const isValid = await bcrypt.compare(
              validatedValuesData["password"],
              userOriginalDetails["password"] || ""
            );
  
            if (!isValid && validatedValuesData["password"] !== "") {
              toBeUpdatedFields["password"] = validatedValuesData["password"];
            }
          } else {
            if (userOriginalDetails[key] !== validatedValuesData[key]) {
              toBeUpdatedFields[key] = validatedValuesData[key];
            }
          }
        }
      }
  
      //   2.) Update fields
  
      await db.user.update({
        where: {
          id: session?.userId,
        },
        data: toBeUpdatedFields,
      });
  
      return {
        status: "success",
        message: "Profile is updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        message: "Something went wrong, try after sometime",
      };
    }
  };
  

