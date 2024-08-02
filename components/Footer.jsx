import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='py-12'>
      <div className="px-8 w-full flex justify-between items-center">
        <Image 
          src={'/logo.png'}
          alt='logo'
          width={157.5}
          height={40}
        />

        <p className="font-normal text-base text-right text-gray-600">© 2024 Epicurious</p>
      </div>
    </div>
  )
}

export default Footer
