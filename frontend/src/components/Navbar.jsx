import React from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
const Navbar = ({toggleSidebar,isShown}) => {

  return (
    <div className='flex gap-2 p-2 sticky top-0 z-50 bg-white shadow-md items-center justify-between'>
      <div className=' block lg:hidden '
      onClick={toggleSidebar}
      >

        {isShown ? (<IoClose className='text-2xl font-bold text-red-800' />) :(<RiMenu2Line className='text-2xl font-bold' />) }
        
      </div>
      <h1>Navbar</h1>
    </div>
  )
}

export default Navbar