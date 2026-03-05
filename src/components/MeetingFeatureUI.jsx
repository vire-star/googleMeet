'use client'
import React, { useState } from 'react'
import { Button } from './ui/button';


const slides = [
  {
    image:
      "https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg",
    title: "Get a link you can share",
    description:
      "Click New meeting to get a link you can send to people you want to meet with",
  },
  {
    image:
      "https://www.gstatic.com/meet/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg",
    title: "Plan ahead",
    description:
      "Click New meeting to schedule meetings in Google Calendar and send invites to participants",
  },
  {
    image:
      "https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
    title: "Your meeting is safe",
    description:
      "No one can join a meeting unless invited or admitted by the host",
  },
];

const MeetingFeatureUI = () => {
const [currentSlide, setcurrentSlide] = useState(0)

const nextSlide=()=>{
  // let's say current slide is 0, and we have total 3 slides, so next slide should be 1, and if current slide is 2, then next slide should be 0
  const nextIndes = (currentSlide+1)%slides.length
  setcurrentSlide(nextIndes)
}
const prevSlide=()=>{
  // let's say current slide is 0, and we have total 3 slides, so next slide should be 1, and if current slide is 2, then next slide should be 0
  const nextIndes = (currentSlide-1+slides.length)%slides.length
  setcurrentSlide(nextIndes)
}
  return (
    <div>
      <div className='w-[50%] h-[calc(100vh-4rem)] flex-1  flex flex-col items-center justify-center'>


      <img className='h-24 w-24 mx-auto' src={slides[currentSlide].image} alt={slides[currentSlide].title} />

    <h1>{slides[currentSlide].title}</h1>
    <p>{slides[currentSlide].description}</p>
    <Button onClick={nextSlide}>
      <span className='text-lg font-bold'>Next</span>
    </Button>
    <Button onClick={prevSlide}>
      <span className='text-lg font-bold'>prev</span>
    </Button>
      </div>
    </div>
  )
}

export default MeetingFeatureUI