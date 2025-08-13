import React from 'react'

const TaskStatusBox = ({text,count,bgColor}) => {
  return (
    <div className={`flex flex-col ${bgColor} text-white px-4 py-2 rounded-md `}>
        <h1 className='lg:text-sm text-xs'>{text}</h1>
        <span className='lg:text-2xl text-lg '>{count}</span>
    </div>
  )
}

export default TaskStatusBox