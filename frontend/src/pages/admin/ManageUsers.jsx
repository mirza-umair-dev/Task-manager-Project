import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/ApiPaths'
import UserCard from '../../components/UserCard';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const ManageUsers = () => {
  const [Users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response  =  await axiosInstance.get(API_PATHS.USERS.GET_TEAM_MEMBERS);
      setUsers(response.data.teamMembers);
    } catch (error) {

      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  
  return (
   <DashboardLayout >
     <div className='flex flex-col gap-4 p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
       {Users?.map((user) => (
         <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
   </DashboardLayout>
  )
}

export default ManageUsers