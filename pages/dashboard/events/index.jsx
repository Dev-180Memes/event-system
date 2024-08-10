import React, { useState, useEffect } from 'react';
import Layout from '@/components/Dashboard/Layout';
import Link from 'next/link';
import withAuth from '@/components/hoc/withAuth';
import axios from 'axios';
import formatDate from '@/utils/formatDate';
import decodeToken from '@/utils/decodeToken';
import Image from 'next/image';
import toast from 'react-hot-toast';

function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Events = () => {
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(4);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`/api/events/user/${userId}`);
        const fetchedEvents = response.data.map(event => ({
          ...event,
          formattedDate: formatDate(event.startdate)
        }));

        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const toggleDropdown = (index) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenRowIndex(null);
    setShowDeleteModal(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterEvents(tab);
    setCurrentPage(1);
  };

  const filterEvents = (tab) => {
    const now = new Date();
    let filtered = events;

    if (tab === 'upcoming') {
      filtered = events.filter(event => new Date(event.startdate) >= now);
    } else if (tab === 'past') {
      filtered = events.filter(event => new Date(event.startdate) < now);
    }

    setFilteredEvents(filtered);
  };

  const deleteEvent = async (id) => {
    try {
      const response = await axios.delete(`/api/events/${id}`);
      if (response.status === 200) {
        const updatedEvents = events.filter(event => event._id !== id);
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
        setShowDeleteModal(false);
        setDeleteId(null);
        toast.success('Event deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting event:', error );
      toast.error('An error occurred. Please try again.');
    }
  };

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 ">
            <div className="flex flex-col gap-1 w-full">
              <h2 className="font-semibold text-3xl text-gray-900">Events</h2>
              <p className="font-normal text-base text-gray-600 text-nowrap">Monitor key metrics and stay on top of your event performance.</p>
            </div>
            <div className="flex flex-row gap-3 w-full">
              <div className="w-full rounded-lg border h-fit py-2.5 px-3.5 border-gray-300 shadow flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" className="w-full outline-none text-base font-normal text-gray-700" placeholder='Search' />
              </div>
              <Link href={'/dashboard/events/create'} className='py-3 px-4 gap-2 rounded-lg bg-violet-600 h-fit border border-violet-600 shadow flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p className='text-nowrap p-0 m-0 font-semibold text-sm text-white'>Create Event</p>
              </Link>
            </div>
          </div>
          <div className="border-b border-gray-200">
            <div className="flex gap-4">
              <div className={`pt-[1px] px-1 cursor-pointer pb-[11px] ${activeTab === 'all' ? 'border-violet-700 border-b-2' : ''}`}>
                <p className={`font-semibold text-sm ${activeTab === 'all' ? 'text-violet-700' : 'text-gray-500'}`} onClick={() => handleTabChange('all')}>All events</p>
              </div>
              <div className={`pt-[1px] px-1 cursor-pointer pb-[11px] ${activeTab === 'upcoming' ? 'border-violet-700 border-b-2' : ''}`}>
                <p className={`font-semibold text-sm ${activeTab === 'upcoming' ? 'text-violet-700' : 'text-gray-500'}`} onClick={() => handleTabChange('upcoming')}>Upcoming events</p>
              </div>
              <div className={`pt-[1px] px-1 cursor-pointer pb-[11px] ${activeTab === 'past' ? 'border-violet-700 border-b-2' : ''}`}>
                <p className={`font-semibold text-sm ${activeTab === 'past' ? 'text-violet-700' : 'text-gray-500'}`} onClick={() => handleTabChange('past')}>Past events</p>
              </div>
            </div>
          </div>
        </div>
        {events.length === 0 ? (
          <div className="w-full flex items-center justify-center h-[80vh]">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col gap-6 w-2/5 justify-center items-center">
                <Image 
                  src={'/Illustration.png'}
                  alt="No events"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col gap-2 justify-center">
                  <h2 className="font-semibold text-center text-xl text-gray-900">No events found</h2>
                  <p className="font-normal text-base text-gray-600 text-center">You haven't added any events to your schedule yet. It's the perfect time to start planning something amazing!</p>
                </div>
              </div>
              <Link href={'/dashboard/events/create'} className='py-3 px-4 gap-2 rounded-lg bg-violet-600 h-fit border border-violet-600 shadow flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p className='text-nowrap p-0 m-0 font-semibold text-sm text-white'>Create Event</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 shadows">
            <table className="w-full">
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='max-w-80 py-3 px-6  bg-none font-medium text-xs text-gray-600 text-left'>Name</th>
                  <th className="max-w-44 py-3 px-6  bg-gray-50 font-medium text-xs text-gray-600 text-left">Category</th>
                  <th className="max-w-44 py-3 px-6  bg-gray-50 font-medium text-xs text-gray-600 text-left">Ticket Type</th>
                  <th className="max-w-36 py-3 px-6  bg-gray-50 font-medium text-xs text-gray-600 text-left">Date</th>
                  <th className="max-w-36 py-3 px-6  bg-gray-50 font-medium text-xs text-gray-600 text-left">Time</th>
                  <th className="max-w-16 py-3 px-6  bg-gray-50 invisible-content font-medium text-xs text-gray-600 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event, index) => (
                  <tr className="border-b border-gray-200" key={event._id}>
                    <td className="max-w-80 overflow-hidden py-4 px-6 font-normal text-sm text-gray-600 text-left">{event.name}</td>
                    <td className="max-w-44 overflow-hidden py-4 px-6 font-normal text-sm text-gray-600 text-left">{capitalizeFirstLetter(event.category)}</td>
                    <td className="max-w-44 overflow-hidden py-4 px-6 font-normal text-sm text-gray-600 text-left">{event.tickets.length === 1 ? "Single Ticket" : "Multiple Tickets"}</td>
                    <td className="max-w-36 overflow-hidden py-4 px-6 font-normal text-sm text-gray-600 text-left">{event.formattedDate}</td>
                    <td className="max-w-36 overflow-hidden py-4 px-6 font-normal text-sm text-gray-600 text-left">{event.starttime}</td>
                    <td className="max-w-16 overflow-hidden py-4 px-6 font-normal text-sm text-gray-600 text-left">
                      <button className="flex items-center gap-2" onClick={() => toggleDropdown(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                      </button>
                      {openRowIndex === index && (
                        <div className="absolute right-6 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <Link href={`/dashboard/events/${event._id}`} className="block py-0.5 px-1.5 hover:bg-gray-100">
                            <div className="py-2 px-2.5">
                              <p className="font-normal text-sm text-gray-600">View</p>
                            </div>
                          </Link>
                          <Link href={`/dashboard/events/edit/${event._id}`} className="block py-0.5 px-1.5 hover:bg-gray-100">
                            <div className="py-2 px-2.5">
                              <p className="font-normal text-sm text-gray-600">Edit</p>
                            </div>
                          </Link>
                          <button className="flex py-0.5 px-1.5 hover:bg-gray-100 w-full items-start" onClick={() => handleDelete(events[index]._id)}>
                            <div className="py-2 px-2.5">
                              <p className="font-normal text-sm text-red-600">Delete</p>
                            </div>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex justify-between items-center border-t border-gray-200 pt-3 px-6 pb-4">
              <p className="font-medium text-sm text-gray-700">
                Page {currentPage} of {Math.ceil(filteredEvents.length / eventsPerPage)}
              </p>
              <div className="flex gap-3">
                <button
                  className="rounded-lg border py-2 px-3.5 border-gray-300 shadow font-semibold text-sm text-gray-700"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="rounded-lg border py-2 px-3.5 border-gray-300 shadow font-semibold text-sm text-gray-700"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredEvents.length / eventsPerPage)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
          <div className="bg-white rounded-xl w-[400px] shadow-xl">
            <div className="w-full pt-6 px-6 pb-0 gap-4 flex flex-col">
              <div className="w-full flex justify-between">
                <div className="rounded-3xl border-8 border-red-50 bg-red-100 w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
                <button 
                  className='rounded-lg p-2.5'
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-lg text-gray-900">Delete event</h2>
                <p className='font-normal text-sm text-gray-600'>Are you sure you want to delete this event? This action cannot be undone.</p>
              </div>
            </div>
            <div className="w-full pt-8">
              <div className="w-full flex gap-3 px-6 pb-6">
                <button
                  className='rounded-lg border border-gray-300 py-2.5 px-4 shadow font-semibold text-base text-gray-700 w-full'
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className='rounded-lg bg-red-600 py-2.5 px-4 shadow font-semibold text-base text-white w-full'
                  onClick={() => {
                    // console.log('Deleting event:', deleteId);
                    deleteEvent(deleteId);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default withAuth(Events);
