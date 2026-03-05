'use client'
import { Button } from '@/components/ui/button'
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
const { data: session, status } = useSession()
  const { roomId } = useParams()

  const [isMeeting, setIsMeeting] = useState(false) // ✅ add this
  const containerRef = useRef(null)

  // ✅ yahi define karna hai
  const zegoInstanceRef = useRef(null)

  const hasJoined = useRef(false)

  const joinMeeting = async (element) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    )

    const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      session?.user?.id || Date.now().toString(),
      session?.user?.name || "Guest"
    )

    const zp = ZegoUIKitPrebuilt.create(kitToken)

    // ✅ now it exists
    zegoInstanceRef.current = zp

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    })
    setIsMeeting(true) // ✅ set this to true when meeting starts
  }

  useEffect(() => {
    if (
      status === "authenticated" &&
      containerRef.current &&
      !hasJoined.current
    ) {
      hasJoined.current = true
      joinMeeting(containerRef.current)
    }
  }, [status])

  // ✅ safe cleanup
  useEffect(() => {
    return () => {
      if (zegoInstanceRef.current) {
        zegoInstanceRef.current.destroy()
        zegoInstanceRef.current = null
      }
    }
  }, [])

  const endMeeting = () => {
  if (zegoInstanceRef.current) {
    zegoInstanceRef.current.destroy()
    zegoInstanceRef.current = null
  }

  setIsMeeting(false)
}
  return (
    <div className='flex flex-col min-h-screen w-full '>
      <div className={`flex-grow flex flex-col md:flex-row relative ${isMeeting?'h-screen':""}`}>

        <div ref={containerRef}
        className='video-container flex-grow'
        style={{height:isMeeting?'100%':'0px'}}
        >

        </div>

        <div>
  {
    isMeeting && (
      <div className='flex flex-col'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white'>
            Meeting Info
          </h2>
          <p className='mb-4 text-gray-600'>
            Participant - {session?.user?.name || 'Guest'}
          </p>

          <Button onClick={endMeeting} variant='destructive'>
            End Meeting
          </Button>
        </div>
      </div>
    )
  }
</div>

      </div>

    </div>
  )
}

export default page