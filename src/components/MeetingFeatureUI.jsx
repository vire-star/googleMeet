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
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length
    setCurrentSlide(nextIndex)
  }

  const prevSlide = () => {
    const nextIndex = (currentSlide - 1 + slides.length) % slides.length
    setCurrentSlide(nextIndex)
  }

  return (
    <div className="w-[50%] h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-8">
      
      <div className="text-center max-w-md">

        <img
          className="h-32 w-32 mx-auto mb-8 transition-all duration-300"
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
        />

        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {slides[currentSlide].title}
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {slides[currentSlide].description}
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={prevSlide}
            className="px-6"
          >
            Prev
          </Button>

          <Button
            onClick={nextSlide}
            className="px-6"
          >
            Next
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-black scale-125"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default MeetingFeatureUI
