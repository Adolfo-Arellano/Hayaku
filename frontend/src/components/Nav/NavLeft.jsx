import React from 'react'
import HayakuMS from '/src/assets/img/HayakuMS.png'

const NavLeft = () => {
  return (
    <div className="flex items-center gap-3">
        <img className='h-11 w-11' src={HayakuMS} alt="Logotipo Hayaku" />
        <span className='font-semibold'>Siguiendo</span>
        <span className='font-semibold'>Explorar</span>
        <img></img>
    </div>
  )
}

export default NavLeft