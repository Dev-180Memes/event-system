import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const Event = () => {
  return (
    <div className='w-full px-20 min-h-screen'>
      <Navbar />
      <div className="border-b border-b-gray-200">
        <div className="py-12 flex flex-col gap-8">
          <div className="px-8 flex flex-col gap-4">
            <div className="rounded-3xl border px-2 pt-3 pb-2.5 gap-1.5 bg-blend-multiply bg-violet-50 border-violet-200 flex items-center w-fit h-fit">
              <div className="w-2 h-2 rounded-full bg-violet-500"/>
              <p className="font-medium text-sm text-center text-violet-700">School & Education</p>
            </div>
            <h2 className="font-semibold text-3xl text-gray-900">Untitled Designers Conference 2024</h2>
          </div>
          <div className="flex flex-col gap-8 px-8">
            <Image 
              src={'/image.png'}
              width={400}
              height={200}
              alt="Event Image"
              className='w-full h-80 object-cover rounded-lg'
            />
            <div className="flex justify-between w-full gap-24">
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Organized by</p>
                  <p className="font-medium text-lg text-gray-900">COLPHYSSA</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Date</p>
                  <p className="font-medium text-lg text-gray-900">17 Jan 2024</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Time</p>
                  <p className="font-medium text-lg text-gray-900">09:00 AM - 07:00 PM</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Venue</p>
                  <p className="font-medium text-lg text-gray-900">Peak Olam Suites</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit flex gap-2 text-nowrap text-gray-700 items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                  </svg>
                  Copy link
                </button>
                <button className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </button>
                <button className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"></path>
                  </svg>
                </button>
                <button className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                  </svg>
                </button>
                <button className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between gap-20 pb-12 px-8">
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-3xl text-gray-900">About This Event</h3>
            <p className="font-normal text-lg text-gray-600">
              At UDC2024 , with this years theme “Beyond The Canvas“ , where design expands beyond pixels and portfolios, we are bringing together top designers, educators, and business leaders to discuss the challenges and opportunities in the Digital Design Ecosystem in Africa how how they went Beyond their Canvases.
              From the Art of Wellbeing, Building a growth mindset, Personal Branding we will cover a wide range of topics that are shaping our career as designers in Africa
              Whether you are a seasoned designer, an up-and-coming talent, or a business leader looking to connect with other Designers and also to stay ahead of the curve, UDC2024 is the perfect place to gain insights, make connections, and learn about best practices in design.
              We look forward to seeing you on the 23rd & 24th AUGUST 2024, at QueensPark
            </p>
          </div>
          <div className="rounded-xl py-6 px-5 gap-8 bg-gray-50 h-fit flex flex-col">
            <div className="flex flex-col gap-5 w-80">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg text-gray-900">Ticket</p>
                <p className="font-normal text-sm text-gray-500">Your ticket type determines what you have access to</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-base text-gray-600">General admission</p>
                    <p className="font-semibold text-base text-violet-600">Free</p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <button className="w-8 h-8 border border-gray-300 shadow p-2 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <p className='font-semibold text-base text-gray-900'>0</p>
                    <button className="w-8 h-8 border border-gray-300 shadow p-2 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="font--normal text-sm text-gray-500">
                  This event is absolutely free and this ticket grants you access!
                </p>
              </div>
            </div>
            <button className="rounded-lg border border-violet-300 w-full py-2.5 px-4 bg-violet-300 shadow text-white font-semibold text-base">
              Reserve Spot
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Event
