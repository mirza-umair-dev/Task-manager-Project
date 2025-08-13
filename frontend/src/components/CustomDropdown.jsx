import React from 'react'
import { FaAngleDown } from "react-icons/fa6";

const CustomDropdown = ({options,label,placeholder,name,value,onChange}) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <label className='text-sm font-md text-gray-600'>{label}</label> 
     <div className='flex items-center justify-between relative w-full'>
       <select className='relative px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 outline-none transition-colors appearance-none duration-200 w-full'
       name={name}
       value={value}
       onChange={onChange}
       >
        <option value="" disabled >{placeholder}</option>
        {options.map((option,index) => (
          <option key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
        ))}
       
      </select>
       <FaAngleDown className='absolute right-4'/>
     </div>
    </div>
  )
}

export default CustomDropdown