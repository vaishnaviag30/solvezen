"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormHeader } from "./form-header";
import { useCreateProblem } from "@/hooks/use-create-problem";
import { BasicInfoSection } from "./basic-info-section";
import { TagsSection } from "./tags-section";
import { TestCasesSection } from "./test-cases-section";
import { LanguageSections } from "./language-section";

export function CreateProblemForm(){
    const {
        form,
        testCasesArray,
        tagsArray,
        isLoading,
        sampleType,
        setSampleType,
        onSubmit,
        loadSampleData,
    } = useCreateProblem()
    return(
        <div className="container mx-auto py-8 px-4 max-w-7xl">
           <Card className="shadow-xl">
            {/* FormHeader */}
            <FormHeader
                sampleType={sampleType}
                setSampleType={setSampleType}
                onLoadSample={loadSampleData}
            />    
               <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-8">
                    <BasicInfoSection form={form}/>
                    <TagsSection form={form} tagsArray={tagsArray}/>
                    <TestCasesSection form={form} testCasesArray={testCasesArray}/>
                    <LanguageSections form={form}/>
                    <AdditionalInfoSection form={form} />
                </form>
               </CardContent>
            </Card> 
        </div>
    )
}