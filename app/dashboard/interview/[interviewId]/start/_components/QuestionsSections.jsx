import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function QuestionsSections({interviewData,activeQuestionIndex}) {
 // console.log(JSON.parse(interviewData.jsonMockResp))
 //console.log(activeQuestionIndex)
 
   const [questions,setQuestions]=useState(JSON.parse(interviewData.jsonMockResp));

    

    
    

  // try {
  //   if (interviewData && interviewData.jsonMockResp) {
  //     questions = JSON.parse(interviewData.jsonMockResp);
  //     //console.log(typeof questions); // Should log 'object' if parsing is successful
  //   } else {
  //     console.log('interviewData.jsonMockResp is undefined or null');
  //   }
  // } catch (error) {
  //   console.error('Error parsing JSON:', error);
  // }

 const textToSpeech =(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Sorry your browser doesn not support Text to Speech')
    }
 }
  //console.log(questions.length)
  return questions&&(
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  '>
          <h2 className={`p-2  rounded-full text-md md:text-sm text-center cursor-pointer ${activeQuestionIndex==0 && 'bg-purple-700 text-black '}`}>Question 1:</h2>
          <h2 className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==1 && 'bg-purple-700 text-white '}`}>Question 2:</h2>
          <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==2 && 'bg-purple-700 text-white '}`}>Question 3:</h2>
          <h2 className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==3 && 'bg-purple-700 text-white '}`}>Question 4:</h2>
          <h2 className={`p-2  rounded-full text-xs md:text-md text-center cursor-pointer ${activeQuestionIndex==4 && 'bg-purple-700 text-white '}`}>Question 5:</h2>
          
       
        </div>
        <h2 className='my-4 text-xs md:text-md'>{questions[activeQuestionIndex]?.Question}</h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(questions[activeQuestionIndex]?.Question)}/>
        <div className='border rounded-lg p-5 bg-blue-200 mt-18'>
          <h2 className='flex gap-2 items-center text-blue-700'>
               <Lightbulb/>
              <string>Note:</string>
          </h2>
          <h2 className='text-sm text-blue-700'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
         
        </div>
    </div>
  )
}

export default QuestionsSections