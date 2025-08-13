import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const SignUpPopUp = () => {
  return (
    <div className=' bg-white/10 backdrop-blur-lg flex items-center justify-center h-screen flex-col '>
     <div className='backdrop-blur-2xl bg-white/30 rounded-lg shadow-lg lg:h-1/4 md:w-1/3 w-1/2 xl:h-1/3 flex items-center justify-between flex-col px-4 py-4 border transition-transform duration-300 scale-120 border-gray-400'>
       <div><FaRegCheckCircle className='text-6xl text-blue-600 transition-scale scale-110 duration-1000 ' /></div>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='md:text-3xl lg:text-2xl text-lg text-center'>Account Created Successfully</h1>
        <p className='text-xs text-gray-600'>Try Logging In</p>
      </div>
      <button className='px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-900 transition duration-500 text-white'><Link to='/auth/login'>Login</Link></button>
     </div>
    </div>
  )
}

export default SignUpPopUp