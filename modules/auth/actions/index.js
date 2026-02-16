"use server" //ye line next.js ko btatati hai ki ye file sirf server pr chalegi browser pr nhi

import {db} from "@/lib/db"; //db is prisma database client
import {currentUser} from "@clerk/nextjs/server"; //it works onyl on server side

export const onBoardUser = async()=>{
    try{
        const user = await currentUser();
        if(!user){
            return {success: false, error: "No authenticated user found"};
        }
        const { id, firstName, lastName, imageUrl, emailAddresses} = user;

        const newUser = await db.user.upsert({
            where: {
                clerkId: id,
            },
            update: {
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
            },
            create: {
                clerkId : id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
            },
        });
        return {
            success:true,
            user:newUser,
            message:"User onBoarded Successfully"
        }
    }catch (error) {
        console.error("❌ Error onboarding user:", error);
        return{
            success: false,
            error: "Failed to onboard user"
        };
    }
};