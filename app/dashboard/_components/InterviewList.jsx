"use client"
import { useUser } from '@clerk/nextjs'
import React, { useState,useEffect } from 'react'
import { db } from '@/utils/db'
import {eq,desc} from 'drizzle-orm'
import { MockInterview } from '@/utils/schema';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {

    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    const GetInterviewList=async()=>{
            try {
                const result=await db.select().from(MockInterview)
                .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id))
                console.log(result);
                setInterviewList(result);
            } catch (error) {
                console.log("Error Fetching Data:",error)
            }
    }
    useEffect(()=>{
        user&&GetInterviewList();
    },[user])
  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 my-3'>
             {interviewList.length > 0 ? (
        interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview}  key={index}/>
       
        ))
      ) : (
        <p>No Data Available.</p>
      )}
        </div>
    </div>
  )
}

export default InterviewList