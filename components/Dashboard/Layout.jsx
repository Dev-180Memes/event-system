import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='w-full min-h-screen pt-8 pb-12 px-8 bg-white'>
        {children}
      </div>
    </div>
  )
}

export default Layout
