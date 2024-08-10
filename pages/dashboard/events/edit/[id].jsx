import React, { useState, useEffect } from 'react';
import Layout from '@/components/Dashboard/Layout';
import Link from 'next/link';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import withAuth from '@/components/hoc/withAuth';
import {  useDropzone } from 'react-dropzone';

const EditEvent = () => {
  const [selected, setSelected] = useState('single');
  const [ticketNumeration, setTicketNumeration] = useState('single');
  const [tickets, setTickets] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

  const router = useRouter();
  const { id: eventId } = router.query;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST)");
  const [frequency, setFrequency] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [purchaseLimit, setPurchaseLimit] = useState('');

  useEffect(() => {
    if (eventId) {
      axios.get(`/api/events/${eventId}`)
        .then((response) => {
          if (response.status === 200) {
            const event = response.data;
            setName(event.name);
            setDescription(event.description);
            setImageUrl(event.imageurl);
            setCategory(event.category);
            setLocation(event.location);
            setTimezone(event.timezone);
            setFrequency(event.frequency);
            setStartDate(event.startdate);
            setEndDate(event.enddate);
            setStartTime(event.starttime);
            setEndTime(event.endtime);
            setWebsite(event.website);
            setTwitter(event.twitter);
            setInstagram(event.instagram);
            setFacebook(event.facebook);
            setTickets(event.tickets);
            setPurchaseLimit(event.purchaseLimit);
            setTicketNumeration(event.tickets.length > 1 ? 'multiple' : 'single');
          }
        })
        .catch((error) => {
          console.error('Error fetching event:', error);
        });
    }
  }, [eventId]);

  const updateTicket = (index, field, value) => {
    const newTickets = [...tickets];
    newTickets[index][field] = value;
    setTickets(newTickets);
  };

  const handleEventUpdate = async () => {
    const token = localStorage.getItem('token');

    const data = {
      name,
      description,
      imageurl,
      category,
      location,
      timezone,
      frequency,
      startdate,
      enddate,
      starttime,
      endtime,
      website,
      twitter,
      instagram,
      facebook,
      tickets,
      purchaseLimit,
    };

    try {
      const response = await axios.put(`/api/events/edit/${eventId}`, data);

      if (response.status === 200) {
        toast.success('Event updated successfully');
        router.push('/dashboard/events');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(error.response.data || 'Error updating event. Please try again.');
    }
  };

  const maxSize = 1024 * 1024 * 4; // 4MB

  const onDrop = async (acceptedFiles) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);
    
    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: '8abdbad2335b4f5dcac281c6e08ac5b3',
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setImageUrl(response.data.data.url);
        setImageUploading(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageUploading(false);
      toast.error('Error uploading image. Please try again.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: 'image/svg+xml, image/png, image/jpeg, image/gif',
  });

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full border-b border-b-gray-200 flex gap-4 pb-5 justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-3xl text-gray-900">Edit Event</h2>
            <p className="font-normal text-base text-gray-600">Modify the details of your event</p>
          </div>
          <div className="flex gap-3">
            <Link href={'/dashboard/events'} className="border border-gray-300 rounded-lg shadow py-2.5 px-4 h-fit font-semibold text-sm text-gray-700">Cancel</Link>
            <button 
              className="border border-violet-600 rounded-lg shadow py-2.5 px-4 bg-violet-600 h-fit font-semibold text-sm text-white"
              onClick={() => {
                if (!name || !description || !imageurl || !category || !location || !timezone || !startdate || !starttime || !enddate || !endtime) {
                  return toast.error('Please fill in all required fields');
                }

                if (selected === 'recurring' && !frequency) {
                  return toast.error('Please select a frequency for the recurring event');
                } else if (selected === 'single') {
                  setFrequency('single');
                }

                if (tickets.length === 0) {
                  return toast.error('Please add at least one ticket');
                }

                const invalidTickets = tickets.filter(ticket => !ticket.name || !ticket.description || !ticket.quantity || (ticket.type === 'paid' && !ticket.price));
                if (invalidTickets.length > 0) {
                  return toast.error('Please fill in all ticket details');
                }

                handleEventUpdate();
              }}
            >Save Changes</button>
          </div>
        </div>
        <form className="flex flex-col gap-5">
          <div className="flex gap-8">
            <label htmlFor="" className='font-semibold text-sm text-gray-700 w-1/4'>Event Name</label>
            <input 
              type="text" 
              className="rounded-lg w-2/4 border outline-none py-2.5 px-3.5 border-gray-300 shadow text-normal text-base text-gray-700" 
              placeholder='e.g., Linear' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex gap-8">
            <label htmlFor="" className="block w-1/4">
              <p className="font-semibold text-sm text-gray-700">Description</p>
              <p className="font-normal text-sm text-gray-600">Write a short description.</p>
            </label>
            <div className="w-2/4 flex flex-col gap-3">
              <div className="w-full flex flex-col gap-1.5">
                <textarea 
                  name="" 
                  id="" 
                  className='border border-gray-300 rounded-lg py-3 px-3.5 shadow outline-none font-normal text-sm text-gray-600' 
                  rows={7} 
                  placeholder='Lorem ipsum dolor sit amet'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex gap-8">
            <label htmlFor="" className="block w-1/4">
              <p className="font-semibold text-sm text-gray-700">Image</p>
              <p className="font-normal text-sm text-gray-600">This will be displayed on your event page.</p>
            </label>
            <div {...getRootProps()} className="w-2/4 rounded-xl border py-4 px-6 border-gray-200 gap-3 flex flex-col items-center justify-center cursor-pointer">
              <input {...getInputProps()} />
              <div className="w-10 h-10 border border-gray-200 rounded-lg shadow flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  <p className='font-semibold text-sm text-violet-700'>{isDragActive ? 'Drop the files here ...' : imageUploading ? 'Uploading ...' : 'Choose a file'}</p>
                  {!isDragActive || !imageUploading && <p className="font-normal text-sm text-gray-600">or drag and drop</p>}
                </div>
                <p className='font-normal text-sm text-center text-gray-600'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              {imageurl && (
                <div className="mt-4">
                  <img src={imageurl} alt="Uploaded" className="max-w-full h-auto" />
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex gap-8">
            <label htmlFor="" className="block w-1/4 font-semibold text-sm text-gray-700">Category</label>
            <select 
              name="" 
              id="" 
              className="rounded-lg border border-gray-300 bg-white py-2.5 px-3.5 w-2/4 outline-none font-normal text-base text-gray-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
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
            <input 
              type="text" 
              className="rounded-lg border border-gray-300 py-2.5 px-3.5 w-2/4 outline-none font-normal text-base text-gray-500" 
              placeholder='Enter event address' 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex gap-8 items-start">
            <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
              Date & Time
            </label>
            <div className="flex flex-col w-2/4 gap-5">
              <div className="border border-gray-300 rounded-lg py-2.5 px-3.5 shadow gap-2 flex">
                <select 
                  name="" 
                  id="" 
                  className='w-full bg-white font-normal text-base text-gray-600 outline-none'
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
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
                <select 
                  name="" 
                  id="" 
                  className="rounded-lg border border-gray-300 py-2.5 px-3.5 bg-white w-full outline-none font-normal text-base text-gray-500"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  required
                >
                  <option value="">Select Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="" className='font-medium text-sm text-gray-700'>Start Date</label>
                <div className="flex gap-4 w-full">
                  <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                    <input 
                      type="text" 
                      placeholder="yyyy-mm-dd" 
                      id="start-date" 
                      className="w-full outline-none text-gray-500 text-base font-normal" 
                      value={startdate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                    <input 
                      type="text" 
                      placeholder="hh:mm" 
                      className="w-full outline-none text-gray-500 text-base font-normal" 
                      id='start-time' 
                      value={starttime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="" className='font-medium text-sm text-gray-700'>End Date</label>
                <div className="flex gap-4 w-full">
                  <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                    <input 
                      type="text" 
                      placeholder="yyyy-mm-dd" 
                      id="end-date" 
                      className="w-full outline-none text-gray-500 text-base font-normal" 
                      value={enddate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="border border-gray-300 w-full shadow py-2.5 px-3 rounded-lg gap-2 flex items-center">
                    <input 
                      type="text" 
                      placeholder="hh:mm" 
                      className="w-full outline-none text-gray-500 text-base font-normal" 
                      id='end-time' 
                      value={endtime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
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
                  <input 
                    type="text" 
                    placeholder="Your Website URL" 
                    className="w-full outline-none text-gray-500 text-base font-normal" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Your X (Twitter) Handle" 
                    className="w-full outline-none text-gray-500 text-base font-normal" 
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Your Instagram Handle" 
                    className="w-full outline-none text-gray-500 text-base font-normal" 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="rounded-lg border border-gray-300 gap-2 shadow py-2.5 px-3.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Your Facebook URL" 
                    className="w-full outline-none text-gray-500 text-base font-normal" 
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex gap-8 items-start">
            <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
              Ticket Type
            </label>
            <div className="w-2/4 flex flex-col gap-5">
              <div className="py-2.5 px-3.5 gap-2 rounded-lg border border-gray-300 shadow flex">
                <select 
                  name="" 
                  id="" 
                  className='w-full bg-transparent font-normal text-base text-gray-500 outline-none'
                  value={ticketNumeration}
                  onChange={(e) => setTicketNumeration(e.target.value)}
                >
                  <option value="single">Single Ticket</option>
                  <option value="multiple">Multiple Tickets</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          {tickets.map((ticket, index) => (
            <div key={index} className='flex flex-col gap-5'>
              <div className="flex gap-8 items-start">
                <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700'>
                  Ticket {index + 1} Name
                </label>
                <div className="flex w-2/4 gap-4 flex-col">
                  <input 
                    type="text" 
                    className="rounded-lg border border-gray-300 shadow px-3.5 py-2.5 text-base font-normal text-gray-600 outline-none" 
                    placeholder='e.g. Linear' 
                    value={ticket.name}
                    onChange={(e) => updateTicket(index, 'name', e.target.value)}
                  />
                  <div className="flex gap-4 w-full">
                    <label
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all w-full ${
                        ticket.type === 'free' ? 'border-violet-600 bg-violet-50' : 'border-gray-300'
                      } ${ticket.type === 'free' ? 'text-violet-700' : 'bg-white text-gray-500'}`}
                    >
                      <input
                        type="radio"
                        name={`ticket-type-${index}`}
                        value="free"
                        className={`form-radio text-violet-500 ${ticket.type === 'free' ? 'custom-radio' : ''}`}
                        checked={ticket.type === 'free'}
                        onChange={() => updateTicket(index, 'type', 'free')}
                      />
                      <span>Free Ticket</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all w-full ${
                        ticket.type === 'paid' ? 'border-violet-600 bg-violet-50' : 'border-gray-300'
                      } ${ticket.type === 'paid' ? 'text-violet-700' : 'bg-white text-gray-500'}`}
                    >
                      <input
                        type="radio"
                        name={`ticket-type-${index}`}
                        value="paid"
                        className={`form-radio text-violet-500 ${ticket.type === 'paid' ? 'custom-radio' : ''}`}
                        checked={ticket.type === 'paid'}
                        onChange={() => updateTicket(index, 'type', 'paid')}
                      />
                      <span>Paid Ticket</span>
                    </label>
                  </div>
                  {ticketNumeration === 'multiple' && (
                    <button
                      type="button"
                      className="text-white border border-red-500 rounded-lg px-4 py-2.5 text-sm font-medium bg-red-500"
                      onClick={() => setTickets(tickets.filter((_, i) => i !== index))}
                    >
                      Remove Ticket
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200" />
              <div className="flex gap-8">
                <label htmlFor="" className="block w-1/4">
                  <p className="font-semibold text-sm text-gray-700">Ticket {index + 1} Description</p>
                  <p className="font-normal text-sm text-gray-600">Write a short description.</p>
                </label>
                <div className="w-2/4 flex flex-col gap-3">
                  <div className="w-full flex flex-col gap-1.5">
                    <textarea 
                      name="" 
                      id="" 
                      className='border border-gray-300 rounded-lg py-3 px-3.5 shadow outline-none font-normal text-sm text-gray-600' 
                      rows={7}
                      placeholder='Lorem ipsum dolor sit amet'
                      value={ticket.description}
                      onChange={(e) => updateTicket(index, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-200"/>
              <div className="flex gap-8 items-start">
                <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700'>
                  Ticket {index + 1} Stock Remaining
                </label>
                <input 
                  type="text" 
                  className="rounded-lg border border-gray-300 shadow w-2/4 px-3.5 py-2.5 text-base font-normal text-gray-600 outline-none" 
                  placeholder='Enter number of tickets' 
                  value={ticket.quantity}
                  onChange={(e) => updateTicket(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="w-full h-[1px] bg-gray-200"/>
              {ticket.type === 'paid' && (
                <>
                  <div className="flex gap-8 items-start">
                    <label htmlFor="" className='w-1/4 font-semibold text-sm text-gray-700 flex gap-1 items-center'>
                      Ticket {index + 1} Price
                    </label>
                    <div className="w-2/4 border border-gray-300 shadow rounded-lg flex">
                      <p className="border-r pr-3.5 pl-3 py-2.5 border-r-gray-300 font-normal text-base text-gray-600">NGN</p>
                      <input 
                        className="w-full py-2.5 px-3.5 text-gray-600 text-base font-normal outline-none" 
                        value={ticket.price}
                        onChange={(e) => updateTicket(index, 'price', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-gray-200" />
                </>
              )}
            </div>
          ))}
          {ticketNumeration === 'multiple' && (
            <>
              <button
                type="button"
                className="text-white border border-violet-600 rounded-lg px-4 py-2.5 text-sm font-medium bg-violet-600"
                onClick={() => setTickets([
                  ...tickets,
                  {
                    name: '',
                    description: '',
                    type: 'free',
                    quantity: '',
                    price: '',
                  },
                ])}
              >
                Add Another Ticket
              </button>
              <div className="w-full h-[1px] bg-gray-200" />
            </>
          )}
          <div className="flex gap-8">
            <label htmlFor="" className="block w-1/4 font-semibold text-sm text-gray-700">Ticket Purchase Limit</label>
            <select 
              name="" 
              id="" 
              className="rounded-lg border border-gray-300 bg-white py-2.5 px-3.5 w-2/4 outline-none font-normal text-base text-gray-500"
              value={purchaseLimit}
              onChange={(e) => setPurchaseLimit(e.target.value)}
            >
              <option value="">Select your max per person</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default withAuth(EditEvent);
