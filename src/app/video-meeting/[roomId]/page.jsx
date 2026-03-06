'use client'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
  const { data: session, status } = useSession()
  const { roomId } = useParams()

  const [isMeeting, setIsMeeting] = useState(false)
  const containerRef = useRef(null)
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
    zegoInstanceRef.current = zp

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    })

    setIsMeeting(true)
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
    toast.success("Meeting Ended")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Video Container */}
        <div
          ref={containerRef}
          className={`w-full transition-all duration-300 ${
            isMeeting ? "h-[75vh]" : "h-0"
          }`}
        />

        {/* Bottom Info Panel */}
        {isMeeting && (
          <div className="flex items-center justify-between px-8 py-4 border-t bg-gray-50">
            <div>
              <p className="text-sm text-gray-500">Room ID</p>
              <p className="font-medium text-gray-800">{roomId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Participant</p>
              <p className="font-medium text-gray-800">
                {session?.user?.name || "Guest"}
              </p>
            </div>

            <Button
              onClick={endMeeting}
              variant="destructive"
            >
              End Meeting
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}

export default page
