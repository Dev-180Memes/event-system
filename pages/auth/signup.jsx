import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center'>
      <div className='max-w-96 mt-14 flex flex-col gap-8'>
        <div className="flex flex-col items-center gap-6">
          <Image src='/logo.png' width={189} height={48} alt='logo' />
          <div className="flex flex-col gap-3 items-center">
            <h1 className='font-semibold text-3xl text-gray-900'>Create an account</h1>
            <p className="font-normal text-base text-gray-600">Start your 30-day free trial.</p>
          </div>
        </div>
        <form action="" className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-medium text-sm text-gray-700">Name*</label>
              <input type="text" className="border rounded-lg py-2.5 px-3.5 border-gray-300 shadow" placeholder='Enter your name' />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-medium text-sm text-gray-700">Email*</label>
              <input type="email" className="border rounded-lg py-2.5 px-3.5 border-gray-300 shadow" placeholder='Enter your email' />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-medium text-sm text-gray-700">Password*</label>
              <input type="password" className="border rounded-lg py-2.5 px-3.5 border-gray-300 shadow" placeholder='Create a password' />
              <p className="font-normal text-sm text-gray-600">Must be at least 8 characters.</p>
            </div>
          </div>
          <button type="submit" className="w-full rounded-lg bg-violet-600 py-2.5 px-4.5 border shadow font-semibold text-base text-white">Sign in</button>
        </form>
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-normal text-sm text-gray-600">Don’t have an account?</p>
          <Link href={'/auth/login'} className='font-semibold text-sm text-violet-700'>Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
