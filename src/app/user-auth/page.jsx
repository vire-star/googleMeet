'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react';
const page = () => {
  const url = process.env.NEXTAUTH_URL

  const handleLogin = async(provider)=>{
    try {
      await signIn(provider,{callbackUrl:url})
    } catch (error) {
      console.error(error,'Login error')
    }
  }
  return (
    <div className='h-screen w-full flex  bg-gradient-to-r from-slate-100 to-slate-300 items-center justify-center'>
      <div className='w-1/2 h-full flex items-center justify-center'>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3d.iconscout.com%2F3d%2Fpremium%2Fthumb%2Fuser-authentication-10824918-8747553.png&f=1&nofb=1&ipt=3b7cefe002d288b2e3a7e72b96ef3c1c5f6f8d2875c4181151c198b386003606" alt="" className=' h-[80%] w-[80%] object-contain' />
      </div>
      <div className='w-1/2 h-full  flex items-center justify-center'>
       <div className='py-10 px-5 text-center w-[76%] bg-zinc-50 rounded-md shadow-2xl'>
        <h1 className='text-5xl font-extrabold tracking-tight'>Welcome To Google Meet</h1>
        <h2 className='font-light text-2xl tracking-tighter text-slate-600'>Please sign in to continue</h2>
       <div className='w-full flex flex-col mt-7 gap-5 items-center justify-center '>
         <Button onClick={() => handleLogin('google')} variant='outline' className='w-full py-6 shadow-2xl ' >
           <FaGoogle />Google
        </Button>
        <Button onClick={() => handleLogin('github')} className='w-full py-6 shadow-2xl '>
           <FaGithub /> Github
        </Button>
       </div>
       </div>
      </div>
     
    </div>
  )
}

export default page