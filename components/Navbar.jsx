import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars as MenuIcon, FaTimes as XIcon } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='w-full py-4 flex items-center justify-between px-6 md:px-8'>
      <Link href={'/'}>
        <Image 
          src={'/logo.png'}
          alt='logo'
          width={157.5}
          height={40}
        />
      </Link>

      <div className='hidden md:flex gap-3'>
        <Link href={'/auth/login'} className="rounded-lg py-2.5 px-[18px] font-semibold text-base text-gray-600 h-fit">Log in</Link>
        <Link href={'/auth/signup'} className='rounded-lg py-2.5 px-[18px] font-semibold text-base text-white border border-violet-600 bg-violet-600 h-fit shadow'>Sign up</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className='md:hidden'>
        <button onClick={toggleMenu}>
          {isOpen ? (
            <XIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20'>
          <div className='flex flex-col gap-3 p-4'>
            <Link href={'/auth/login'} className="rounded-lg py-2.5 px-[18px] font-semibold text-base text-gray-600 h-fit">Log in</Link>
            <Link href={'/auth/signup'} className='rounded-lg py-2.5 px-[18px] font-semibold text-base text-white border border-violet-600 bg-violet-600 h-fit shadow'>Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
