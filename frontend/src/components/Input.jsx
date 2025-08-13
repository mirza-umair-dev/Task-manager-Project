import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Input = ({placeholder,type,label,onChange,value}) => {
    const [showPassword, setshowPassword] = useState(false);
    
    const passwordToggle = () =>{
        setshowPassword(!showPassword);
    }
  return (
    <div className='flex flex-col gap-2'>
        <label className='text-[14px] text-slate-700'>{label}</label>
        <div className='flex items-center justify-between bg-gray-100 rounded-lg p-3 border-gray-200 border hover:border-gray-400 transition-colors duration-200'>
            <input type={type == 'password' ? showPassword ? 'text' : 'password':type}
        placeholder={placeholder}
        onChange={(e)=>onChange(e)}
        value={value}
        className='w-full h-full outline-none '
         />
         {
            type=='password' && (
                <>
                {showPassword ? (<FaEyeSlash
                size={20}
                onClick={()=> passwordToggle()}
                className='text-gray-900 cursor-pointer'
                 />):(
                 <FaEye 
                 size={20}
                onClick={()=> passwordToggle()}
                className='text-gray-900 cursor-pointer'
                />)
                 }
                </>
                
               
            )
         }
        </div>
    </div>
  )
}

export default Input