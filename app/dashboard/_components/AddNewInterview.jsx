"use client"
import React,{useState} from 'react'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation'

function AddNewInterview() {
  const [openDailog,setOpenDailog]=useState(false)
  const [jobPosition,setJobPosition]=useState();
  const [jobDesc,setJobDesc]=useState();
  const [jobExperience,setJobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const [jsonResponse,setJsonResponse]=useState([])
  const router=useRouter();
  const {user}=useUser();
  const onSubmit = async(e)=>{
    setLoading(true);
    e.preventDefault()
    console.log(jobPosition,jobDesc,jobExperience);
    const InputPrompt="Job Description: "+jobPosition+", Job Description:"+jobDesc+" Years of Experience: "+jobExperience+",Please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answered in JSON format.Give Question and Answer as field in JSON"
    const result=await chatSession.sendMessage(InputPrompt)
    const mockResponse=result.response.text().replace('```json','').replace('```','')
    //console.log(JSON.parse(mockResponse));
    console.log(JSON.parse(mockResponse));
    setJsonResponse(mockResponse)
   
    if(mockResponse){
    const resp =await db.insert(MockInterview).values({
      mockId:uuidv4(),
      jsonMockResp:mockResponse,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')

    }).returning({mockId:MockInterview.mockId})
  
  console.log("Inserted Id: ",resp)
      if(resp){
        setOpenDailog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
}
  else{
    console.log("Error occurred");
  }
   setLoading(false);
  }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 cursor-pointer hover:shadow-md transition-all'
        onClick={()=> setOpenDailog(true)}
        >
            <h2 className='text-lg text-center'>+Add New</h2>
        </div>
    <Dialog open={openDailog} >
      
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Details regarding your Job Interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
            <div>
             
              <h2>Add details about your position,Job description,years of experience</h2>
              <div className='mt-7 my-2' >
                <label >Job Role/Job Position</label>
                <Input placeholder="Ex Full Stack Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>

                 <div className='my-3' >
                <label >Job Description/Tech Stack</label>
                <Textarea placeholder="Eg React,Spring Bood,Node JS,AWS etc" required
                 onChange={(event)=>setJobDesc(event.target.value)}
                />
              </div>

                <div className='mt-7 my-2' >
                <label >Years of Experience</label>
                <Input placeholder="Ex 5" type="number" required
                  onChange={(event)=>setJobExperience(event.target.value)}
                />
              </div>
            </div>
            <div className='flex gap-5 justify-end'>
              <Button variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
              <Button type="submit" disabled={loading} >
                {loading?
                <>
                <LoaderCircle className='animate-spin'/>Generating Questions</>:'Start Interview'
                }
               
               </Button>
            </div>
            </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>



    </div>
  )
}

export default AddNewInterview



