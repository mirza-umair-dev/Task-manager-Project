import React from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
const Navbar = ({toggleSidebar,isShown}) => {

  return (
    <div className='flex gap-2 p-2 sticky top-0 z-50  items-center justify-between'>
      <div className=' block lg:hidden '
      onClick={toggleSidebar}
      >

        {isShown ? (<IoClose className='text-2xl font-bold text-red-800' />) :(<RiMenu2Line className='text-2xl font-bold' />) }
        
        <h1 className='text-sm font-semibold text-blue-500'>100Tasks</h1>
      </div>  
    </div>
  )
}

export default Navbar