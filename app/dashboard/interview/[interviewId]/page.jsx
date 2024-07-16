"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect,useState } from 'react'
import {eq} from 'drizzle-orm'
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'

function Interview({params}) {
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);
    //const [fetch,setFetch] =useState(false) 
    useEffect(()=>{
        
        console.log(params.interviewId);
        getInterviewDetails();
     
        //console.log(result)
        //console.log(interviewData)
        
    },[])
    const getInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
        console.log(result)
        setInterviewData(result[0])
        //console.log(interviewData)
      
    
    
    }
  return (
    <div className='my-10 '>
        <h2 className='font-bold text-2xl'>Let's get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
             <div className='flex flex-col my-5 gap-5 ' >
              <div className='flex flex-col p-5 rounded-lg border gap-5 '>
            <h2 className='text-xl'><strong>Job Role:</strong>{interviewData?interviewData.jobPosition:"Loading"}</h2>

            <h2 className='text-xl'><strong>Job Description:</strong>{interviewData?interviewData.jobDesc:"Loading"}</h2>


            <h2 className='text-xl'><strong>Years of Experience:</strong>{interviewData?interviewData.jobExperience:"Loading"}</h2>
            </div>

              <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-200'>
              <h2 className='flex gap-2 items-center text-yellow-400'>  <Lightbulb/> <strong>Information</strong></h2>
              <h2 className='mt-3 text-yellow-550'>{process.env.NEXT_PUBLIC_INFO}</h2>
        
        </div>

        </div>

            <div>
            {webCamEnabled? 
            <Webcam
            onUserMedia={()=>setWebCamEnabled(true)}
            onUserMediaError={()=>setWebCamEnabled(false)}
            mirrored={true}
            style={{
                height:300,
                width:300
            }}
            />
            : 
            <>       
           <WebcamIcon className='h-72 w-full bg-secondary my-6 p-20'/>
            <Button variant="ghost" onClick={()=>setWebCamEnabled(true)} >Enable Web cam</Button>
            </>
            }
        </div>

      
        </div>
        <div className='flex justify-end items-end'>
          <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
            <Button > Start Interview</Button>
          </Link>
          
        </div>

      
        
      
        
    </div>
  )
}

export default Interview


