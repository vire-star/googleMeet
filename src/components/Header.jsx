'use client'
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
  const { data: session, status } = useSession()

  console.log(session?.user?.image)
  const handleSignout = () => {
    signOut({ callbackUrl: '/user-auth' })
  }

  return (
    <div className='w-full h-16 bg-gradient-to-r from-slate-100 to-slate-300 flex items-center justify-between px-9 shadow-md'>
      
      <div className='flex items-center gap-3'>
        <div className='h-14 w-14 bg-red-600'>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F704%2F812%2Fpng-transparent-google-meet-camera-logo-icon.png"
            className='w-full h-full object-cover'
            alt="logo"
          />
        </div>
        <h1 className='text-2xl font-bold'>Google Meet</h1>
      </div>

      {status === "authenticated" && (
        <Popover>
          <PopoverTrigger asChild>
            <img
              className='h-10 w-10 rounded-full cursor-pointer'
              src={session?.user?.image}
              alt="profile"
            />
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>{session?.user?.name}</PopoverTitle>
              <Button
                onClick={handleSignout}
                className='bg-red-500 hover:bg-red-600 text-white'
              >
                SignOut <FaSignOutAlt />
              </Button>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      )}

    </div>
  )
}

export default Header
