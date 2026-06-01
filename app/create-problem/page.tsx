import { getCurrentUserData } from '@/modules/auth/actions';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { CreateProblemForm } from '@/modules/problems/comonents/create-problem-form';

const CreateProblemPage = async() => {
    const user = await getCurrentUserData();
    if(user?.role !== UserRole.ADMIN){
        redirect("/")
    }
  return (
    <section className='flex flex-col items-center justify-center  mx-4 my-4'>
        <div className='flex flex-row justify-between items-center w-full'>
            <Link href={"/"}> 
            <Button className="" variant={"outline"} size={"icon"}>
                <ArrowLeft className='siize-4' />
            </Button>
            </Link>
            <h1 className='text-3xl font-bold text-amber-400'>Welcome {user?.firstName}! Create a Problem</h1>
        <ModeToggle />
        </div>

        <CreateProblemForm />
    </section>
  )
}

export default CreateProblemPage