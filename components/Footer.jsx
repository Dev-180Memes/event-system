import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='py-12 bg-white'>
      <div className="px-6 md:px-8 w-full flex flex-col md:flex-row justify-between items-center">
        <div className='mb-4 md:mb-0'>
          <Image 
            src={'/logo.png'}
            alt='logo'
            width={157.5}
            height={40}
          />
        </div>

        <p className="font-normal text-base text-center md:text-right text-gray-600">© 2024 Epicurious</p>
      </div>
    </footer>
  )
}

export default Footer;
