"use client"
import React, { useEffect,useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from "sonner"
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment'
import { useUser } from "@clerk/clerk-react";
import { db } from '@/utils/db';

const RecordAnsSection = ({interviewData,activeQuestionIndex}) => {
    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults

  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  }); 
  const [userAnswer,setUserAnswer]=useState('')
  const [questions,setQuestions]=useState(JSON.parse(interviewData.jsonMockResp));
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const [loading2,setLoading2]=useState(false);
  
  useEffect(()=>{
    results.map((result)=>{
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  },[results])

  // useEffect(()=>{
  //   if(!isRecording){
  //     showFeedback();
  //   }
  // },[userAnswer])
  

  const StartStopRecording=()=>{
    if(isRecording){
      setLoading(true);
      stopSpeechToText();
     // console.log("Testing:",userAnswer);
      // if(userAnswer?.length<5){
      //   console.log(userAnswer)
      //   console.log(userAnswer.length)
      //   toast('Error while saving answer.Please record again')
      //   //return :
      // }
         
    }
   // console.log(userAnswer)
    else{
      startSpeechToText();
      setLoading(false)
    }
    
  }
 

  const showFeedback=async()=>{
    console.log(userAnswer);
    setLoading2(true);
    console.log("Answer",userAnswer)
     const feedbackPrompt="Question:"+questions[activeQuestionIndex]?.Question+", User Answer:" +userAnswer+ ", Depends on question and user answer for given interview question"+"please give us Rating in stars(0-5) for answer and feedback as area of Improvement if any" +"in just 3-5 lines to improve it in JSON format with rating field and feedback field";
    const result=await chatSession.sendMessage(feedbackPrompt)
    const mockJsonResp=result.response.text().replace('```json','').replace('```','')
    console.log(mockJsonResp);
    const JsonFeedbackResp=JSON.parse(mockJsonResp);
    console.log("JSON:",JsonFeedbackResp);

    const resp=await db.insert(UserAnswer).values({
      mockIdRef:interviewData?.mockId,
      question:questions[activeQuestionIndex]?.Question,
      correctAns:questions[activeQuestionIndex]?.Answer,
      userAns:userAnswer,
      feedback:JsonFeedbackResp?.feedback,
      rating:JsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')


    })
    if(resp){
      toast('User Answer Recorded')
      setResults([]);
    }
    setResults([]);
    setUserAnswer('')
    setLoading2(false);
   

  }

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col justify-center items-center bg-black  rounded-lg p-5 mny-20'>
        <Image src={"/webcam.jpg"} width={200} height={200} className='absolute'/>
        <Webcam
            mirrored={true}
            style={{
                height:300,
                width:'100%',
                zindex:10,
            }}
        />

    </div>
    
        <Button disbled={loading}className='bg-purple-700 my-10' onClick={StartStopRecording}>
        {isRecording?
            <h2 className='text-red-600 flex gap-2'>
              <Mic/>Stop Recording...
            </h2>
          :

        
        'Record Answer'}</Button>
          <Button className='bg-purple-700 ' disabled={loading2} onClick={showFeedback} > Confirm Answer</Button>
        
         
    </div>
  )
}

export default RecordAnsSection