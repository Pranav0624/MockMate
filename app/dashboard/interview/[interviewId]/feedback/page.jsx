"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import React, { useEffect,useState } from 'react'
import {eq} from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {
  const [feedbackList,setFeedbackList]=useState([])
  const route=useRouter();

    const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
      console.log(result);
      setFeedbackList(result); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  
  // const GetFeedback=async()=>{
  //         const result=await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id);
  //         //.log(result);
  //         feedback=result;
  //        console.log(result);
  //         //console.log(feedback);
          
  //       }

  useEffect(()=>{
    GetFeedback();
    //console.log(feedbackList);
  },[params.interviewId]);
  //GetFeedback();
  return feedbackList&&(
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
        <h2 className='font-bold text-2xl'>Here is your interview Feedback</h2>
        <h2 className='text-purple-700 text-lg my-3'>Your Interview Rating:<string>7/10</string></h2>
        <h2 className='text-sm text-gray-500'>Find below Interview Question with correct answer,Your answer and feedback for improvement</h2>
            {feedbackList.length > 0 ? (
        feedbackList.map((feedback, index) => (
          <Collapsible key={index} className='mt-6'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-5 w-full'>{feedback.question} <ChevronsUpDown className='h-5 w-5 gap-6'/></CollapsibleTrigger>
            <CollapsibleContent >
             <div className='flex flex-col gap-2'>
              <h2 className='text-red-900 p-2 border rounded-lg'><strong>Rating:</strong>{feedback.rating}</h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{feedback.userAns}</h2>
               <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{feedback.correctAns}</h2>
               <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{feedback.feedback}</h2>
             </div>
              {/* <p>Correct Answer: {feedback.correctAns}</p>
              <p>Your Answer: {feedback.userAns}</p>
              <p>Feedback: {feedback.feedback}</p> */}
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
           
           <Button onClick={()=>route.replace('/dashboard')} className='bg-purple-700 mt-6'>Go Home</Button>



        
    </div>
  )
}

export default Feedback