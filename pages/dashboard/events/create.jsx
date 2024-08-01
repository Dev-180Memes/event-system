import React, { useState, useEffect } from 'react';
import Layout from '@/components/Dashboard/Layout';
import Link from 'next/link';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const Create = () => {
  const [selected, setSelected] = useState('single');
  const [selectedTicketType, setSelectedTicketType] = useState('free')
  const [page, setPage] = useState(2);

  useEffect(() => {
    Flatpickr('#start-date', {
      dateFormat: 'Y-m-d',
    });

    Flatpickr('#start-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
    });

    Flatpickr('#end-date', {
      dateFormat: 'Y-m-d',
    });

    Flatpickr('#end-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full border-b border-b-gray-200 flex gap-4 pb-5 justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-3xl text-gray-900">Create Event</h2>
            <p className="font-normal text-base text-gray-600">Enter details of your event to get it successfully created</p>
          </div>
          <div className="flex gap-3">
            <Link href={'/dashboard/events'} className="border border-gray-300 rounded-lg shadow py-2.5 px-4 h-fit font-semibold text-sm text-gray-700">Cancel</Link>
            <button className="border border-violet-600 rounded-lg shadow py-2.5 px-4 bg-violet-600 h-fit font-semibold text-sm text-white">Continue</button>
          </div>
        </div>
        {page === 1 && (
          <form className="flex flex-col gap-5">
            <div className="flex gap-8">
              <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>Name</label>
              <input type="text" className="rounded-lg w-2/4 border outline-none py-2.5 px-3.5 border-gray-300 shadow text-normal text-base text-gray-700" placeholder='e.g, Linear' />
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className="block w-1/4">
                <p className="font-semibold text-sm text-gray-700">Description</p>
                <p className="font-normal text-sm text-gray-600">Write a short description.</p>
              </label>
              <div className="w-2/4 flex flex-col gap-3">
                {/* WYSIWYG Toolbar */}
                <div className="w-full flex gap-3">
                  <select name="" id="" className="rounded-lg border border-gray-300 py-2.5 px-3.5 shadow w-1/2 text-base font-normal text-gray-500 bg-white outline-none">
                    <option value="regular">Regular</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                  </select>
                  <div className="flex gap-1">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinejoin="round" d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-1.5">
                  <textarea name="" id="" className='border border-gray-300 rounded-lg py-3 px-3.5 shadow outline-none font-normal text-sm text-gray-600' rows={7} placeholder='Lorem ipsum dolor sit amet'></textarea>
                  <p className="font-normal text-sm text-gray-600">5000 characters left</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className="block w-1/4">
                <p className="font-semibold text-sm text-gray-700">Image</p>
                <p className="font-normal text-sm text-gray-600">This will be displayed on your event page.</p>
              </label>
              <div className="w-2/4 rounded-xl border py-4 px-6 border-gray-200 gap-3 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border border-gray-200 rounded-lg shadow flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <p className='font-semibold text-sm text-violet-700'>Click to upload</p>
                    <p className="font-normal text-sm text-gray-600">or drag and drop</p>
                  </div>
                  <p className='font-normal text-sm text-center text-gray-600'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className="block w-1/4 font-semibold text-sm text-gray-700">Category</label>
              <select name="" id="" className="rounded-lg border border-gray-300 bg-white py-2.5 px-3.5 w-2/4 outline-none font-normal text-base text-gray-500">
                <option value="">Select your event category</option>
                <option value="music">Music</option>
                <option value="sports">Sports</option>
                <option value="food">Food</option>
                <option value="technology">Technology</option>
                <option value="art">Art</option>
                <option value="fashion">Fashion</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className="block w-1/4 font-semibold text-sm text-gray-700">Location</label>
              <input type="text" className="rounded-lg border border-gray-300 py-2.5 px-3.5 w-2/4 outline-none font-normal text-base text-gray-500" placeholder='Enter event address' />
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8 items-start">
              <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
                Date & Time
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </label>
              <div className="flex flex-col w-2/4 gap-5">
                <div className="border border-gray-300 rounded-lg py-2.5 px-3.5 shadow gap-2 flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                  </svg>
                  <select name="" id="" className='w-full bg-white font-normal text-base text-gray-600 outline-none'>
                    {/* Time Zones */}
                    <option value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</option>
                    <option value="Mountain Standard Time (MST)">Mountain Standard Time (MST)</option>
                    <option value="Central Standard Time (CST)">Central Standard Time (CST)</option>
                    <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>  
                    <option value="Atlantic Standard Time (AST)">Atlantic Standard Time (AST)</option>
                    <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                    <option value="Central European Time (CET)">Central European Time (CET)</option>
                    <option value="Eastern European Time (EET)">Eastern European Time (EET)</option>
                    <option value="Indian Standard Time (IST)">Indian Standard Time (IST)</option>
                    <option value="Australian Eastern Standard Time (AEST)">Australian Eastern Standard Time (AEST)</option>
                    <option value="New Zealand Standard Time (NZST)">New Zealand Standard Time (NZST)</option>
                    <option value="West Africa Time (WAT)">West Africa Time (WAT)</option>
                </select>
                </div>
                <div className="flex gap-4 w-full">
                  <label
                    className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all w-full ${
                      selected === 'single' ? 'border-violet-600 bg-violet-50' : 'border-gray-300'
                    } ${selected === 'single' ? 'text-violet-700' : 'bg-white text-gray-500'}`}
                  >
                    <input
                      type="radio"
                      name="event-type"
                      value="single"
                      className={`form-radio text-violet-500 ${selected === 'single' ? 'custom-radio' : ''}`}
                      checked={selected === 'single'}
                      onChange={() => setSelected('single')}
                    />
                    <span>Single Event</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all w-full ${
                      selected === 'recurring' ? 'border-violet-600 bg-violet-50' : 'border-gray-300'
                    } ${selected === 'recurring' ? 'text-violet-700' : 'bg-white text-gray-500'}`}
                  >
                    <input
                      type="radio"
                      name="event-type"
                      value="recurring"
                      className={`form-radio text-violet-500 ${selected === 'recurring' ? 'custom-radio' : ''}`}
                      checked={selected === 'recurring'}
                      onChange={() => setSelected('recurring')}
                    />
                    <span>Recurring Event</span>
                  </label>
                </div>
                {selected === 'recurring' && (
                  <select name="" id="" className="rounded-lg border border-gray-300 py-2.5 px-3.5 bg-white w-full outline-none font-normal text-base text-gray-500">
                    <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                )}
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="" className='font-medium text-sm text-gray-700'>Start Date</label>
                  <div className="flex gap-4 w-full">
                    <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <input type="text" placeholder="yyyy-mm-dd" id="start-date" className="w-full outline-none text-gray-500 text-base font-normal" />
                    </div>
                    <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <input type="text" placeholder="hh:mm" className="w-full outline-none text-gray-500 text-base font-normal" id='start-time' />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="" className='font-medium text-sm text-gray-700'>End Date</label>
                  <div className="flex gap-4 w-full">
                    <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <input type="text" placeholder="yyyy-mm-dd" id="end-date" className="w-full outline-none text-gray-500 text-base font-normal" />
                    </div>
                    <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <input type="text" placeholder="hh:mm" className="w-full outline-none text-gray-500 text-base font-normal" id='end-time' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8 items-start">
              <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
                Social details
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </label>
              <div className="w-2/4 flex flex-col gap-5">
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <input type="text" placeholder="Your Website URL" className="w-full outline-none text-gray-500 text-base font-normal" />
                </div>
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"></path>
                  </svg>
                  <input type="text" placeholder="Your X (Twitter) Handle" className="w-full outline-none text-gray-500 text-base font-normal" />
                </div>
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                  </svg>
                  <input type="text" placeholder="Your Instagram Handle" className="w-full outline-none text-gray-500 text-base font-normal" />
                </div>
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                  </svg>
                  <input type="text" placeholder="Your Facebook URL" className="w-full outline-none text-gray-500 text-base font-normal" />
                </div>
              </div>
            </div>
          </form>
        )}

        {page === 2 && (
          <form action="" className="flex flex-col gap-5">
            <div className="flex gap-8 items-start">
              <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
                Ticket Type
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </label>
              <div className="w-2/4 flex flex-col gap-5">
                <div className="py-2.5 px-3.5 gap-2 rounded-lg border border-gray-300 shadow flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                  </svg>
                  <select name="" id="" className='w-full bg-transparent font-normal text-base text-gray-500 outline-none'>
                    <option value="single">Single Ticket</option>
                    <option value="multiple">Multiple Tickets</option>
                  </select>
                </div>
                <div className="flex gap-4 w-full">
                  <label
                    className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all w-full ${
                      selectedTicketType === 'free' ? 'border-violet-600 bg-violet-50' : 'border-gray-300'
                    } ${selectedTicketType === 'free' ? 'text-violet-700' : 'bg-white text-gray-500'}`}
                  >
                    <input
                      type="radio"
                      name="event-type"
                      value="single"
                      className={`form-radio text-violet-500 ${selected === 'single' ? 'custom-radio' : ''}`}
                      checked={selectedTicketType === 'free'}
                      onChange={() => setSelectedTicketType('free')}
                    />
                    <span>Free Ticket</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all w-full ${
                      selectedTicketType === 'paid' ? 'border-violet-600 bg-violet-50' : 'border-gray-300'
                    } ${selectedTicketType === 'paid' ? 'text-violet-700' : 'bg-white text-gray-500'}`}
                  >
                    <input
                      type="radio"
                      name="event-type"
                      value="recurring"
                      className={`form-radio text-violet-500 ${selectedTicketType === 'paid' ? 'custom-radio' : ''}`}
                      checked={selectedTicketType === 'paid'}
                      onChange={() => setSelectedTicketType('paid')}
                    />
                    <span>Paid Ticket</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8 items-start">
              <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700'>
                Name
              </label>
              <input type="text" className="rounded-lg border border-gray-300 shadow w-2/4 px-3.5 py-2.5 text-base font-normal text-gray-600" placeholder='e.g. Linear' />
            </div>
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex gap-8">
              <label htmlFor="" className="block w-1/4">
                <p className="font-semibold text-sm text-gray-700">Description</p>
                <p className="font-normal text-sm text-gray-600">Write a short description.</p>
              </label>
              <div className="w-2/4 flex flex-col gap-3">
                {/* WYSIWYG Toolbar */}
                <div className="w-full flex gap-3">
                  <select name="" id="" className="rounded-lg border border-gray-300 py-2.5 px-3.5 shadow w-1/2 text-base font-normal text-gray-500 bg-white outline-none">
                    <option value="regular">Regular</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                  </select>
                  <div className="flex gap-1">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinejoin="round" d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </button>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-1.5">
                  <textarea name="" id="" className='border border-gray-300 rounded-lg py-3 px-3.5 shadow outline-none font-normal text-sm text-gray-600' rows={7} placeholder='Lorem ipsum dolor sit amet'></textarea>
                  <p className="font-normal text-sm text-gray-600">5000 characters left</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200"/>
            <div className="flex gap-8 items-start">
              <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700'>
                Ticket Stock
              </label>
              <input type="text" className="rounded-lg border border-gray-300 shadow w-2/4 px-3.5 py-2.5 text-base font-normal text-gray-600" placeholder='Enter number of tickets' />
            </div>
            <div className="w-full h-[1px] bg-gray-200"/>
            {selectedTicketType === 'paid' && (
              <>
                <div className="flex gap-8 items-start">
                  <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
                    Ticket Type
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                  </label>
                  <div className="w-2/4 border border-gray-300 shadow rounded-lg flex">
                    <p className="border-r pr-3.5 pl-3 py-2.5 border-r-gray-300 font-normal text-base text-gray-600">NGN</p>
                    <input className="w-full py-2.5 px-3.5 text-gray-600 text-base font-normal outline-none" />
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-200" />
              </>
            )}
            <div className="flex gap-8">
              <label htmlFor="" className="block w-1/4 font-semibold text-sm text-gray-700">Ticket Purchase Limit</label>
              <select name="" id="" className="rounded-lg border border-gray-300 bg-white py-2.5 px-3.5 w-2/4 outline-none font-normal text-base text-gray-500">
                <option value="">Select your max per person</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default Create
