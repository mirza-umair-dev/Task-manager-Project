import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/ApiPaths';

// icons
import { FaRegCheckCircle, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaRegCheckCircle className="w-3 h-3 lg:w-5 lg:h-5 text-green-600" />;
      case 'in-progress': return <FaRegClock className="w-3 h-3 lg:w-5 lg:h-5 text-blue-600" />;
      case 'pending': return <FaRegCalendarAlt className="w-3 h-3 lg:w-5 lg:h-5 text-yellow-600" />;
      case 'overdue': return <IoAlertCircleOutline className="w-3 h-3 lg:w-5 lg:h-5 text-red-600" />;
      default: return <FaRegClock className="w-3 h-3 lg:w-5 lg:h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-400 text-white';
      case 'medium': return 'bg-yellow-400 text-white';
      case 'low': return 'bg-green-400 text-white';
      default: return 'bg-gray-400 text-gray-700';
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        clearUser();
        return;
      }
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setuser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        clearUser();
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setuser(userData);
    localStorage.setItem("token", userData.token);
    setloading(false);
  };

  const clearUser = () => {
    setuser('');
    localStorage.removeItem("token");
    setloading(false);
  };


  const value = {
    user,
    loading,
    clearUser,
    updateUser,
    setuser,
    getStatusIcon,
    getPriorityColor
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
