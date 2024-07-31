import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='w-full min-h-screen pt-8 pb-12 px-8 bg-white flex-1 flex flex-col ml-[280px]'>
        {children}
      </div>
    </div>
  )
}

export default Layout
