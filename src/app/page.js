
import Header from '@/components/Header'
import MeetingFeatureUI from '@/components/MeetingFeatureUI'
import MeetingFunctionUI from '@/components/MeetingFunctionUI'
import React from 'react'

const page = () => {
  return (
     <div className="flex flex-col h-screen">
  <Header />

  <div className="flex flex-1">
    <MeetingFunctionUI/>
    <MeetingFeatureUI />
  </div>
</div>
  )
}

export default page