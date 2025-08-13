import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { UserContext } from '../context/UserProvider';

const UserCard = ({ user }) => {

    return (
        <div className='flex flex-col gap-4 p-4 bg-white shadow rounded-lg hover:shadow-lg transition duration-300'>
            <div className='flex gap-4'>
                <div className='w-10 h-10 rounded-full flex items-center justify-between'>
                    {user.profileImgUrl ? (
                        <img
                            src={user.profileImgUrl}
                            alt="Profile"
                            className="w-10 h-10 object-cover rounded-full shadow"
                        />) : (<FaRegCircleUser className='text-6xl drop-shadow' />)}
                </div>
                <div>
                    <h2 className='text-sm text-gray-600'>{user.name}</h2>
                    <p className='text-xs text-gray-600'>{user.email}</p>
                </div>
            </div>

            <div className='flex gap-4'>
                <div className={`text-xs lg:text-sm  flex flex-col  justify-between  px-2 py-1 rounded bg-gray-50 text-yellow-600`}>
                    <span>{user.pending}</span>
                    <span>Pending</span>
                </div>
                <div className={`text-xs lg:text-sm flex flex-col justify-between  px-2 py-1 rounded bg-gray-50 text-green-600`}>
                    <span>{user.completed}</span>
                    <span>Completed</span></div>
                <div className={`text-xs lg:text-sm flex flex-col justify-between px-2 py-1 rounded bg-gray-50 text-blue-600`}>
                    <span>{user.inProgress}</span>
                    <span>In Progress</span></div>
            </div>

        </div>
    )
}

export default UserCard