"use client"

import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {toast} from "sonner";
import { defaultFormValues, problemSchema } from "@/modules/problems/schema";
import { SAMPLE_PROBLEMS } from "@/modules/problems/constant/sample-problem";
import {set, z} from "zod";

type ProblemFormValues = z.infer<typeof problemSchema>;
export function useCreateProblem(){
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);
    const [sampleType , setSampleType] = useState("DP");

    const form = useForm<ProblemFormValues>({
        resolver:zodResolver(problemSchema),
        defaultValues:defaultFormValues
    })

    const testCasesArray = useFieldArray({
        control: form.control,
        name: "testCases",
    })

    const tagsArray = useFieldArray({
        control:form.control,
        name:"tags",
    });

    const onSubmit = async(values)=>{}
    const loadSampleData = ()=>{
        const sampleData = SAMPLE_PROBLEMS[sampleType as keyof typeof SAMPLE_PROBLEMS];
        tagsArray.replace(sampleData.tags.map((tag:any)=>tag));
        testCasesArray.replace(sampleData.testCases.map((tc)=>tc))

        //@ts-ignore
        form.reset(sampleData)
    }
    return {
        form,
        testCasesArray,
        tagsArray,
        isLoading,
        sampleType,
        setSampleType,
        onSubmit: form.handleSubmit(onSubmit),
        loadSampleData,
    }
}