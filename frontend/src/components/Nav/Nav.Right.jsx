import { Crown, MailOpen, MessageSquareDot, User } from 'lucide-react'
import React from 'react'

const NavRight = () => {
  return (
    <div className='flex justify-center items-center gap-6'>
      <button><Crown></Crown></button>
      <button><MessageSquareDot></MessageSquareDot></button>
      <button><MailOpen></MailOpen></button>
      <span className='border rounded-xl px-2 py-1'>Dile adios a la publicidad con Hayaku+</span>
      <button><User></User></button>
    </div>
  )
}

export default NavRight