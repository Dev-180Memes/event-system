import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='w-full py-[18px] flex items-center justify-between px-8'>
      <Image 
        src={'/logo.png'}
        alt='logo'
        width={157.5}
        height={40}
      />
      <div className="flex gap-3">
        <Link href={'/auth/login'} className="rounded-lg py-2.5 px-[18px] font-semibold text-base text-gray-600 h-fit">Log in</Link>
        <Link href={'/auth/signup'} className='rounded-lg py-2.5 px-[18px] font-semibold text-base text-white border border-violet-600 bg-violet-600 h-fit shadow'>Sign up</Link>
      </div>
    </div>
  )
}

export default Navbar
