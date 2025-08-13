import React, { useContext } from 'react'
import UserProvider, { UserContext } from '../context/UserProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const {user,loading} = useContext(UserContext);

  if(loading) return <div >loading...</div>;
  const token = localStorage.getItem('token');
  if(!token || !user){
    <Navigate to={'/auth/login'} />
  }
  
  return <Outlet />
}

export default PrivateRoute