import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MyTasks from './pages/User/MyTasks'
import UserDashboard from './pages/User/UserDashboard'
import TaskDetails from './pages/User/TaskDetails'
import ManageUsers from './pages/admin/ManageUsers'
import ManageTasks from './pages/admin/ManageTasks'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateTask from './pages/admin/CreateTask'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import PrivateRoute from './routes/PrivateRoute'
import ForgotPassword from './pages/auth/ForgotPassword'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='bg-gray-50'>
      <BrowserRouter >
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<SignUpPage />} />
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        {/* User Routes */}

       <Route element={<PrivateRoute allowedRoles={['user']}/>} >
        <Route path='/user/my-tasks' element={<MyTasks />} />
        <Route path='/user/task-details/:id' element={<TaskDetails />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />
       </Route>

       {/* Admin Routes */}
       <Route element={<PrivateRoute allowedRoles={['admin']}/>}>
       <Route path='/admin/manage-users' element={<ManageUsers />} />
       <Route path='/admin/manage-tasks' element={<ManageTasks />} />
       <Route path='/admin/dashboard' element={<AdminDashboard />} />
       <Route path='/admin/create-task' element={<CreateTask />} />
       <Route path='/admin/create-task/:id' element={<CreateTask />} />
       </Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App