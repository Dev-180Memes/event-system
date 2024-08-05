import React from 'react'

const Card = ({ icon, heading, value, increase }) => {
  return (
    <div className='w-1/3 rounded-xl border p-6 gap-5 border-gray-200 shadow flex flex-col'>
      <div className="w-10 h-10 rounded-lg border border-gray-200 shadow flex items-center justify-center">
        {icon === 'calendar' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>        
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-sm text-gray-600">
          {heading}
        </p>
        <div className="flex items-center gap-2 justify-between">
          <p className="font-semibold text-4xl text-gray-900">
            {value}
          </p>

          {increase && (
            <div className="flex flex-nowrap items-center gap-1">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
                <p className="font-medium text-sm text-green-700">
                  {increase}%
                </p>
              </div>
              <p className="font-medium text-xs text-gray-600">vs last month</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
