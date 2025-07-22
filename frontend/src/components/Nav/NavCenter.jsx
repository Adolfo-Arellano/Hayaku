import { Search } from 'lucide-react'
import React from 'react'

const NavCenter = () => {
  return (
    <div className='flex justify-center px-3 py-1'>
        <input className='w-96 px-3 py-1.5 outline-none rounded-l-md bg-transparent border border-redP placeholder-white/75 font-semibold' placeholder='Buscar'></input>
        <button className='bg-redP px-2 py-1 rounded-r-md border-red-100'><Search></Search></button>
    </div>
  )
}

export default NavCenter