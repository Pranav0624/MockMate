import React from 'react'
import Feedback from '../interview/[interviewId]/feedback/page'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewItemCard({interview}) {

    const router=useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedback=()=>{
         router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        
        <h2 className='font-bold text-purple-700'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At:{interview.createdAt}</h2>
        <div className='flex justify-between my-2 gap-7'>
            
            <Button size="sm" variant="outline" className='w-full' onClick={onFeedback} >Feedback</Button >
          
            
            <Button size="sm" variant="outline" className='text-white bg-purple-700 w-full' onClick={onStart}>Start</Button>
        </div>
        </div>
  )
}

export default InterviewItemCard