import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that email is in valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error('Invalid email address');
    }    

    // Check that password is at least 8 characters
    if (password.length < 8) {
      return toast.error('Password must be at least 8 characters');
    }

    const data = { name, email, password };

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const token = await response.json();
      localStorage.setItem('token', token);
      router.push(router.query.redirect ? router.query.redirect : '/dashboard');
    } else {
      const errorMessage = await response.text();
      toast.error(errorMessage);
    }
  };

  return (
    <div className='w-full h-[100vh] flex justify-center'>
      <div className='max-w-96 mt-14 flex flex-col gap-8'>
        <div className="flex flex-col items-center gap-6">
          <Link href={'/'}>
            <Image src='/logo.png' width={189} height={48} alt='logo' />
          </Link>
          <div className="flex flex-col gap-3 items-center">
            <h1 className='font-semibold text-3xl text-gray-900'>Create an account</h1>
            <p className="font-normal text-base text-gray-600">Start your 30-day free trial.</p>
          </div>
        </div>
        <form action="" className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-medium text-sm text-gray-700">Name*</label>
              <input 
                type="text" 
                className="border rounded-lg py-2.5 px-3.5 border-gray-300 shadow outline-none" 
                placeholder='Enter your name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-medium text-sm text-gray-700">Email*</label>
              <input 
                type="email" 
                className="border rounded-lg py-2.5 px-3.5 border-gray-300 shadow outline-none" 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-medium text-sm text-gray-700">Password*</label>
              <input 
                type="password" 
                className="border rounded-lg py-2.5 px-3.5 border-gray-300 shadow outline-none" 
                placeholder='Create a password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className={`font-normal text-sm ${password.length < 8 ? "text-red-500" : "text-green-500"}`}>Must be at least 8 characters.</p>
            </div>
          </div>
          {name === '' || email === '' || password === '' || password.length < 8 ? (
            <button className="w-full rounded-lg bg-violet-300 py-2.5 px-4.5 border shadow font-semibold text-base text-white cursor-not-allowed" disabled>Sign in</button>
          ) : (
            <button type="submit" className="w-full rounded-lg bg-violet-600 py-2.5 px-4.5 border shadow font-semibold text-base text-white" onClick={handleSubmit}>Sign in</button>
          )}
        </form>
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-normal text-sm text-gray-600">Don’t have an account?</p>
          <Link 
            href={`/auth/login${router.query.redirect ? `?redirect=${router.query.redirect}` : ''}`}
            className='font-semibold text-sm text-violet-700'
          >Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;
