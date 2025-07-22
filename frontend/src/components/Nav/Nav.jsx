import React from 'react'
import NavLeft from './NavLeft'
import NavCenter from './NavCenter'
import NavRight from './Nav.Right'

const Nav = () => {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-[#18181b] flex justify-between items-center px-4 h-14 border-b border-gray-900'>
      <NavLeft />
      <NavCenter />
      <NavRight />
    </div>
  )
}

export default Nav