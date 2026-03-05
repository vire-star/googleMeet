'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { v4 as uuid, v4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const MeetingFunctionUI = () => {

    const [baseUrl, setbaseUrl] = useState("")
    const [dialogOpen, setdialogOpen] = useState(false)
    const [generateMeeting, setgenerateMeeting] = useState("")
    const [meetingLink, setmeetingLink] = useState("")
    
    const router = useRouter()
    useEffect(()=>{
        setbaseUrl(window.location.origin)
    },[])

    const handleCreateMeetingForLater=()=>{
        const roomId = uuid()
        const url = `${baseUrl}/video-meeting/${roomId}`
        setgenerateMeeting(url)
        setdialogOpen(true)

    }

    const handleStartMeeting=()=>{
        const roomId = uuid()
        const url = `${baseUrl}/video-meeting/${roomId}`
        router.push(url)
        toast.success("Meeting Created Successfully.")
    }
    const copyToClipboard=()=>{
        navigator.clipboard.writeText(generateMeeting)
        toast.success("Meeting link copied to clipboard.")
    }

   const handleJoinMeeing = () => {
  if (meetingLink.trim()) {

    const formatedLink = meetingLink.includes("http")
      ? meetingLink
      : `${baseUrl}/video-meeting/${meetingLink}`

    router.push(formatedLink)
    toast.success("Joining Meeting...")
  } else {
    toast.error("Please enter a valid meeting link or ID.")
  }
}
  return (
    <>
    <div className='w-[50%] h-[calc(100vh-4rem)] flex-1  flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
            <h1 className='text-5xl font-bold text-center'>Video call and meeting for everyone</h1>
        <p className='text-center tracking-tight text-slate-600 mt-5'>
            Google Meet is a video conferencing platform developed by Google. It allows users to host and join virtual meetings, video calls, and webinars. With features like screen sharing, real-time captions, and integration with other Google services, Google Meet provides a seamless communication experience for individuals and businesses alike.
        </p>
        </div>
        <div className='flex gap-4 mt-9'>

            <Popover>
  <PopoverTrigger asChild>
     <Button size='lg'>
                Create Meeting
            </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <h1 onClick={handleCreateMeetingForLater} className='text-lg font-semibold'>
        
        Create New Meeting </h1>
      <h1 className='text-lg font-semibold' onClick={handleStartMeeting}>Start an instant meeting</h1>
    </PopoverHeader>
  </PopoverContent>
</Popover>
           
           <div className='flex gap-2'>
             <input value={meetingLink} onChange={(e)=>setmeetingLink(e.target.value)} placeholder='Meeting name' className='border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500'></input>
             <Button onClick={handleJoinMeeing}>
                Join Meeting
             </Button>
           </div>

        </div>
    </div>



<Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
 
  <DialogContent>
    <DialogHeader>
        <DialogTitle>Meeting Created</DialogTitle>
        <div className='w-full h-16 bg-slate-200 rounded-md flex items-center justify-center mt-4'>
            <h1 >{generateMeeting.slice(0,30)}...</h1>
            <CopyIcon onClick={copyToClipboard} className='ml-2 cursor-pointer'/>

        </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </>

  )
}

export default MeetingFunctionUI
