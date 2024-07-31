import React from 'react';
import Layout from '@/components/Dashboard/Layout';
import Link from 'next/link';

const View = () => {
  const data = [
    {
      _id: '1',
      orderNo: '#9982',
      buyerName: 'John Doe',
      buyerEmail: 'johndoe@gmail.com',
      type: 'Paid',
      ticketNo: '2',
      totalPrice: '5,000',
      purchaseDate: ' July 9th, 6:46 PM WAT',
      status: 'Pending'
    },
    {
      _id: '2',
      orderNo: '#9982',
      buyerName: 'John Doe',
      buyerEmail: 'johndoe@gmail.com',
      type: 'Paid',
      ticketNo: '2',
      totalPrice: '5,000',
      purchaseDate: ' July 9th, 6:46 PM WAT',
      status: 'Failed'
    },{
      _id: '3',
      orderNo: '#9982',
      buyerName: 'John Doe',
      buyerEmail: 'johndoe@gmail.com',
      type: 'Paid',
      ticketNo: '2',
      totalPrice: '5,000',
      purchaseDate: ' July 9th, 6:46 PM WAT',
      status: 'Paid'
    },{
      _id: '4',
      orderNo: '#9982',
      buyerName: 'John Doe',
      buyerEmail: 'johndoe@gmail.com',
      type: 'Paid',
      ticketNo: '2',
      totalPrice: '5,000',
      purchaseDate: ' July 9th, 6:46 PM WAT',
      status: 'Paid'
    },{
      _id: '5',
      orderNo: '#9982',
      buyerName: 'John Doe',
      buyerEmail: 'johndoe@gmail.com',
      type: 'Paid',
      ticketNo: '2',
      totalPrice: '5,000',
      purchaseDate: ' July 9th, 6:46 PM WAT',
      status: 'Paid'
    },
  ]

  return (
    <Layout>
      <div className="w-full flex flex-col gap-8">
        <div className="">
          <Link href={'/dashboard/events'} className='text-violet-700 font-semibold text-sm flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            Back to all events
          </Link>
        </div>
        <div className="flex flex-col rounded-xl border pb-6 border-gray-300 gap-6">
          <div className="flex rounded-t-xl items-center justify-between p-6 border-b border-gray-300">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-md border border-gray-200 shadow flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-base text-gray-900">COLPHYSSA DINNER PARTY</h2>
                <p className="font-normal text-sm text-gray-600">
                  Event ID: <span className="font-medium text-sm">106980
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-gray-300 shadow py-2.5 px-4 gap-2 flex items-center text-gray-700 font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                Share
              </button>
              <button className="rounded-lg border border-violet-600 shadow py-2.5 px-4 bg-violet-600 gap-2 flex items-center text-white font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                Edit
              </button>
            </div>
          </div>
          <div className="px-6 flex gap-5 items-center justify-center">
            <div className="flex flex-col gap-0.5 text-center px-5">
              <p className="font-normal text-sm text-gray-600">Organizer</p>
              <h2 className="font-medium text-base text-gray-800">COLPHYSSA</h2>
            </div>
            <div className="w-[1px] h-12 bg-gray-300 -rotate-0" />
            <div className="flex flex-col gap-0.5 text-center px-5">
              <p className="font-normal text-sm text-gray-600">Date</p>
              <h2 className="font-medium text-base text-gray-800">15-05-2024</h2>
            </div>
            <div className="w-[1px] h-12 bg-gray-300 -rotate-0" />
            <div className="flex flex-col gap-0.5 text-center px-5">
              <p className="font-normal text-sm text-gray-600">Time</p>
              <h2 className="font-medium text-base text-gray-800">10am-12pm WAT</h2>
            </div>
            <div className="w-[1px] h-12 bg-gray-300 -rotate-0" />
            <div className="flex flex-col gap-0.5 text-center px-5">
              <p className="font-normal text-sm text-gray-600">Ticket Sales</p>
              <h2 className="font-medium text-base text-gray-800">01/100</h2>
            </div>
            <div className="w-[1px] h-12 bg-gray-300 -rotate-0" />
            <div className="flex flex-col gap-0.5 text-center px-5">
              <p className="font-normal text-sm text-gray-600">Venue</p>
              <h2 className="font-medium text-base text-gray-800">Peak Olam Suites</h2>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50 p-5 rounded-xl flex gap-3">
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="search" className="font-medium text-sm text-gray-700">Search for order</label>
            <div className="border border-gray-300 rounded-lg py-2.5 px-3.5 bg-white shadow gap-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input type="text" className="w-full outline-none font-normal text-base text-gray-700" placeholder='Search' />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="type" className="font-medium text-sm text-gray-700">Type</label>
            <div className="border border-gray-300 rounded-lg py-2.5 px-3.5 bg-white shadow gap-2 flex items-center">
              <select name="type" id="type" className="outline-none font-normal text-base text-gray-500 w-full bg-inherit">
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="status" className="font-medium text-sm text-gray-700">Status</label>
            <div className="border border-gray-300 rounded-lg py-2.5 px-3.5 bg-white shadow gap-2 flex items-center">
              <select name="status" id="status" className="outline-none font-normal text-base text-gray-500 w-full bg-inherit">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl border border-gray-200 shadow">
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50 border-b-gray-200'>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[100px]">Order No</td>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[270px]">Buyer Name</td>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[120px]">Type</td>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[120px]">Ticket No</td>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[140px]">Total Price (₦)</td>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[200px]">Purchase Date</td>
                <td className="py-3 px-6 font-medium text-xs text-gray-600 text-left max-w-[140px]">Payment Status</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className='border-b border-gray-200'>
                  <td className="py-4 px-6 font-normal text-sm text-gray-600 text-left max-w-[100px]">{item.orderNo}</td>
                  <td className="py-4 px-6 font-normal text-gray-600 text-left max-w-[270px] flex flex-col">
                    <p className="font-normal text-sm text-gray-900">{item.buyerName}</p>
                    <p className="font-normal text-sm text-gray-600">{item.buyerEmail}</p>
                  </td>
                  <td className="py-3 px-6 font-normal text-sm text-gray-600 text-left max-w-[120px]">{item.type}</td>
                  <td className="py-3 px-6 font-normal text-sm text-gray-600 text-left max-w-[120px]">{item.ticketNo} tickets</td>
                  <td className="py-3 px-6 font-normal text-sm text-gray-600 text-left max-w-[140px]">{item.totalPrice}</td>
                  <td className="py-3 px-6 font-normal text-sm text-gray-600 text-left max-w-[200px]">{item.purchaseDate}</td>
                  <td className="py-3 px-6 font-normal text-sm text-gray-600 text-left max-w-[140px] flex items-center justify-center">
                    {item.status === 'Pending' ? (
                      <span className="rounded-2xl border py-0.5 px-2 bg-blend-multiply bg-yellow-50 font-medium text-xs text-center text-yellow-700">Pending</span>
                    ) : item.status === 'Paid' ? (
                      <span className="rounded-2xl border py-0.5 px-2 bg-blend-multiply bg-green-50 font-medium text-xs text-center text-green-700">Paid</span>
                    ) : (
                      <span className="rounded-2xl border py-0.5 px-2 bg-blend-multiply bg-red-50 font-medium text-xs text-center text-red-700">Failed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-between items-center border-t border-gray-200 pt-3 px-6 pb-4">
            <p className="font-medium text-sm text-gray-700">Page 1 of 10</p>
            <div className="flex gap-3">
              <button className="rounded-lg border py-2 px-3.5 border-gray-300 shadow font-semibold text-sm text-gray-700">
                Previous
              </button>
              <button className="rounded-lg border py-2 px-3.5 border-gray-300 shadow font-semibold text-sm text-gray-700">
                Next
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}

export default View
