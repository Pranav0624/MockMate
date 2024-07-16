"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import {eq} from 'drizzle-orm'
import QuestionsSections from './_components/QuestionsSections';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function StartInterview({params}) {
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState('')
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
   
     
        async function Fetch(){       
      const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
       // console.log(result[0]);
        setInterviewData(result[0]);
        setMockInterviewQuestion(JSON.parse(result[0].jsonMockResp))
      }
      Fetch();

      
    // console.log("Interview Data :",interviewData);
    //console.log(mockInterviewQuestion);
    
  
  return interviewData&&(
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <QuestionsSections interviewData={interviewData}
          activeQuestionIndex={activeQuestionIndex}
          />
             
        {/* Video */}
        <RecordAnsSection interviewData={interviewData}
          activeQuestionIndex={activeQuestionIndex}/>

        </div>
        <div className='flex justify-end gap-6 mt-5'>
          {activeQuestionIndex>0 &&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} className='bg-purple-700'>Previous Question</Button>}
          {activeQuestionIndex!=4 &&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} className='bg-purple-700'>Next Question</Button>}
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
          {activeQuestionIndex==4 &&<Button  className='bg-purple-700'>End Interview</Button>}
          </Link>
        </div>

    </div>
  )
}

export default StartInterview