import React, { useContext } from 'react'
import { sidebarItems,UsersidebarItems } from '../utils/sidebarData'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider';
import { FaRegCircleUser } from "react-icons/fa6";
const Sidebar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/auth/login')

    
  }
  return (
    <div className='flex flex-col px-3 py-6 bg-gray-50 '>

      <div className='flex items-center flex-col gap-4'>
        <div className='w-16 h-16 rounded-full flex items-center justify-center'>
          {user?.user.profileImgUrl ? (
            <img
            src={user.user.profileImgUrl}
            alt="Profile"
            className="w-16 h-16 object-cover rounded-full shadow"
          />) : (<FaRegCircleUser className='text-6xl drop-shadow' />)}
        </div>
        <div className='flex flex-col items-center justify-center'>
          {user?.user.role === 'admin' ? <h5 className='bg-blue-400 rounded text-xs text-white px-1 py-1' > Admin</h5> : <h5 className='bg-gray-200 rounded px-1 py-1 text-center text-gray-950'>User</h5>}
          <h3 className='text-md font-semibold'>{user?.user.name}</h3>
          <p className='text-gray-500 text-xs'>{user?.user.email}</p>
        </div>
      </div>



      <div className='flex flex-col gap-2 mt-2'>

      {user?.user.role === 'admin' ? 
      (
        sidebarItems.map((item, index) => {
          const Icon = item.icon;
          if (item.action == 'logout') {
            return (
              <button
                key={index}
                onClick={handleLogout}
                className='flex items-center gap-4 px-2 py-3 rounded-md hover:shadow hover:bg-red-100 text-red-600 hover:text-red-800 transition duration-300'
              >
                <Icon className='text-2xl' />
                <span className='text-lg font-semibold'>{item.title}</span>
              </button>
            );
          }

          return (

            
            <NavLink
              key={index}
              to={item.path}
              className=' flex items-center gap-4 px-2 py-3  rounded-lg hover:text-blue-600 hover:bg-linear-to-r from-blue-50 to-blue-200 transition duration-300'
            >
              <Icon className='text-2xl' />
              <span className='text-lg font-semibold'>{item.title}</span>
            </NavLink>
          )
        })
      ) : 
      (
        UsersidebarItems
        .map((item, index) => {
          const Icon = item.icon;
          if (item.action == 'logout') {
            return (
              <button
                key={index}
                onClick={handleLogout}
                className='flex items-center gap-4 px-2 py-3 rounded-md hover:shadow hover:bg-red-100 text-red-600 hover:text-red-800 transition duration-300'
              >
                <Icon className='text-2xl' />
                <span className='text-lg font-semibold'>{item.title}</span>
              </button>
            );
          }

          return (

            
            <NavLink
              key={index}
              to={item.path}
              className=' flex items-center gap-4 px-2 py-3  rounded-lg hover:text-blue-600 hover:bg-linear-to-r from-blue-50 to-blue-200 transition duration-300'
            >
              <Icon className='text-2xl' />
              <span className='text-lg font-semibold'>{item.title}</span>
            </NavLink>
          )
        })
      )}
      </div>

    </div>
  )
}

export default Sidebar