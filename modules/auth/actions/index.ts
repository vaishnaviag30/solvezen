"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;

    const primaryEmail = emailAddresses?.[0]?.emailAddress;

    if (!primaryEmail) {
      return { success: false, error: "No email found for user" };
    }

    const newUser = await db.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: primaryEmail,
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: primaryEmail,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { success: false, error: "Something went wrong" };
  }
};


export const currentUserRole = async () =>{
    try{
        const user = await currentUser();
        if(!user){
            return {success: false, error: "No authenticated user found" };
        }

        const {id} = user;
        const userRole = await db.user.findUnique({
            where:{
                clerkId:id
            },
            select:{
              id:true,
              role:true,

            }
        })
        return userRole?.role;
    }catch (error){
        console.error(" ❌ Error fetching user role:", error);
          return {success: false, error: "Failed to fetch user role" };
    }
}

export const getCurrentUserData = async() => {
  try{
    const user = await currentUser();
    if(!user){
      return {success: false, error: "No authenticated user found" };
    }
    const data = await db.user.findUnique({
      where:{
        clerkId:user.id
      },

    });
    return data;
  } catch (error){

  }
}