import React, { useState, useEffect } from 'react';
import Layout from '@/components/Dashboard/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import withAuth from '@/components/hoc/withAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import formatDate from '@/utils/formatDate';
import Link from 'next/link';

const Preview = () => {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [publishedEvent, setPublishedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return

    if (!id) return

    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        console.log(data);
        setEvent(data);
      } catch (error) {
        toast.error(error.response.data || 'An error occurred');
      }
    }

    fetchEvent();
  }, [id]);

  if (!event) return <Layout>
    <div className="w-full flex items-center justify-center h-[80vh]">
      <p className="font-semibold text-2xl text-gray-900">Loading...</p>
    </div>
  </Layout>;

  const handlePublish = async () => {
    setLoading(true);

    try {
      const { data } = await axios.put(`/api/events/${id}`);
      setPublishedEvent(data);
      setShowPublishModal(true);
    } catch (error) {
      toast.error(error.response.data || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const baseUrl = `${window.location.origin}`;
    const eventLink = `${baseUrl}/event/${publishedEvent?.eventCode || event.eventCode}`;
    navigator.clipboard.writeText(eventLink)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link.');
      });
  };

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <div className="flex gap-8 pb-8 flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-b-gray-200 pb-5 w-full">
            <h2 className="font-semibold text-3xl text-gray-900">{event.name}</h2>
            <div className="flex gap-3 items-center">
              <button className="rounded-lg border border-gray-300 bg-white py-2.5 px-4 shadow flex gap-2 items-center font-semibold text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                Edit
              </button>
              {event?.eventCode || publishedEvent?.eventCode ? (
                <button 
                  className="rounded-lg border py-2.5 px-[18px] gap-2 bg-white border-gray-300 shadow font-semibold text-base text-gray-700 flex items-center w-full justify-center"
                  onClick={handleCopyLink}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                  </svg>
                  Copy link
                </button>
              ) : (
                <button 
                  className="rounded-lg border border-violet-600 bg-violet-600 py-2.5 px-4 shadow flex gap-2 items-center font-semibold text-sm text-white"
                  onClick={handlePublish}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                  {loading ? 'Publishing...' : 'Publish'}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <Image 
              src={event.imageurl}
              width={400}
              height={200}
              alt="Event Image"
              className='w-full h-80 object-cover rounded-lg'
            />
            <div className="flex justify-between w-full gap-24">
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Organized by</p>
                  <p className="font-medium text-lg text-gray-900">
                    {event.createdBy.name > 10
                      ? `${event.createdBy.name.substring(0, 10)}...`
                      : event.createdBy.name}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Date</p>
                  <p className="font-medium text-lg text-gray-900">{formatDate(event.startdate)}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Time</p>
                  <p className="font-medium text-lg text-gray-900">{event.starttime} - {event.endtime}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-sm text-violet-600">Venue</p>
                  <p className="font-medium text-lg text-gray-900">
                    {event.location.length > 20 
                      ? `${event.location.substring(0, 20)}...` 
                      : event.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                {event.website !== '' && (
                  <Link href={event.website} target='_blank' rel='noreferrer' className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </Link>
                )}
                {event.twitter !== '' && (
                  <Link href={event.twitter.startsWith('http') ? event.twitter : `https://twitter.com/${event.twitter}`} target='_blank' rel='noreferrer' className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                      <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"></path>
                    </svg>
                  </Link>
                )}
                {event.instagram !== '' && (
                  <Link href={event.instagram.startsWith('http') ? event.instagram : `https://instagram.com/${event.instagram}`} target='_blank' rel='noreferrer' className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                      <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                    </svg>
                  </Link>
                )}
                {event.facebook !== '' && (
                  <Link href={event.facebook.startsWith('http') ? event.facebook : `https://facebook.com/${event.instagram}`} target='_blank' rel='noreferrer' className="rounded-lg border border-gray-300 p-2.5 bg-white h-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className='size-5 text-gray-500'>
                      <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between gap-20">
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-3xl text-gray-900">About This Event</h3>
            <p className="font-normal text-lg text-gray-600">
              {event.description}
            </p>
          </div>
          <div className="rounded-xl py-6 px-5 gap-8 bg-gray-50 h-fit flex flex-col">
            <div className="flex flex-col gap-5 w-80">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg text-gray-900">Ticket</p>
                <p className="font-normal text-sm text-gray-500">Your ticket type determines what you have access to</p>
              </div>
              {/* <div className="flex flex-col gap-4">
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
              </div> */}

              {event.tickets.map((ticket, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold text-base text-gray-600">{ticket.name}</p>
                      <p className="font-semibold text-base text-violet-600">
                        {ticket.type === 'free' ? 'Free' : `₦ ${ticket.price}`}
                      </p>
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
                    {ticket.description}
                  </p>
                </div>
              ))}
            </div>
            <button className="rounded-lg border border-violet-300 w-full py-2.5 px-4 bg-violet-300 shadow text-white font-semibold text-base">
              Reserve Spot
            </button>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-xl w-[400px] shadow-xl">
            <div className="pt-6 px-6 pb-0 w-full">
              <Image 
                src={publishedEvent.imageurl}
                width={400}
                height={200}
                alt="Event Image"
                className='w-full h-[200px] object-cover'
              />
            </div>
            <div className="pt-6 px-6 pb-0 w-full">
              <div className="flex flex-col gap-1 items-center w-full">
                <p className="font-semibold text-lg text-gray-900">Event published</p>
                <p className="font-normal text-sm text-center text-gray-600">This event has been published. Event attendees would be able to reserve their tickets.</p>
              </div>
            </div>
            <div className="pt-8 ">
              <div className="px-6 pb-6 flex gap-3 justify-center">
                <button 
                  className="rounded-lg border py-2.5 px-[18px] gap-2 bg-white border-gray-300 shadow font-semibold text-base text-gray-700 flex items-center w-full justify-center"
                  onClick={handleCopyLink}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                  </svg>
                  Copy link
                </button>
                <button 
                  className="rounded-lg border py-2.5 px-[18px] bg-violet-600 border-violet-600 shadow font-semibold text-base text-white w-full"
                  onClick={() => (
                    router.push(`/dashboard/events/${publishedEvent._id}`)
                  )}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default withAuth(Preview);
