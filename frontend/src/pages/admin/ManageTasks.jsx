import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const ManageTasks = () => {
  const [tasks, settasks] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [filter, setfilter] = useState('all');
  const navigate = useNavigate();

  const { getStatusIcon, getPriorityColor } = useContext(UserContext);
  const getTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS);
      settasks(response.data);
      setisLoading(false);

    } catch (error) {
      console.error("Error fetching tasks:", error);
      setisLoading(false);
    }
  };


  useEffect(() => {

    getTasks();


  }, [])

  const handleClick = (task) => {
    navigate(`/admin/create-task/${task._id}`);
  }

  //filter Tasks
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');


  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (


    <DashboardLayout >
      <div className='p-4'>
        <div className='p-2'>
          <h1 className='lg:text-2xl text-xl font-bold mb-4'>Manage Tasks</h1>
          <div className='flex gap-4 mb-4'>
            <button onClick={() => setfilter('all')} className={`text-xs lg:text-sm flex items-center justify-between gap-2 px-3 py-2 rounded ${filter === 'all' ? 'border-2 border-blue-600' : 'bg-blue-50 border border-blue-200'}`}>All {tasks.length}</button>
            <button onClick={() => setfilter('pending')} className={`text-xs lg:text-sm flex items-center justify-between gap-2 px-3 py-2 rounded ${filter === 'pending' ? 'border-2 border-blue-600' : 'bg-blue-50 border border-blue-200'}`}>{getStatusIcon('pending')} Pending {pendingTasks.length}</button>
            <button onClick={() => setfilter('completed')} className={`text-xs lg:text-sm flex items-center justify-between gap-2 px-3 py-2 rounded ${filter === 'completed' ? 'border-2 border-blue-600' : 'bg-blue-50 border border-blue-200'}`}>{getStatusIcon('completed')}Completed {completedTasks.length}</button>
            <button onClick={() => setfilter('in-progress')} className={`text-xs lg:text-sm flex items-center justify-between gap-2 px-3 py-2 rounded ${filter === 'in-progress' ? 'border-2 border-blue-600' : 'bg-blue-50 border border-blue-200'}`}>{getStatusIcon('in-progress')}In Progress {inProgressTasks.length}</button>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className='text-center text-gray-500'>Loading tasks...</div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredTasks.map(task => (
                <div key={task._id} className=' p-4 rounded-lg shadow bg-blue-50 border border-blue-200'
                  onClick={() => handleClick(task)}>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>{task.title}</h2>
                    <div className='flex items-center gap-4'>
                      <span className='px-2 py-1 text-lg rounded bg-gray-100'>{getStatusIcon(task.status)}</span>
                      <span className={`text-sm  px-3 py-1 rounded ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    </div>


                  </div>

                  <p className='text-gray-600 text-sm mt-3'>{task.description}</p>
                  <p className='text-sm text-gray-500 mt-1'>Due: {new Date(task.duedate).toLocaleDateString()}</p>

                  <div className='mt-6'><label className='font-semibold' >Progress</label></div>
                  <div className=' mt-1 flex items-center' >
                    <div className='bg-gray-300 w-full h-4 rounded-lg '>
                      <div className='bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-lg text-white'
                        style={{ width: `${task.progress || 0}%` }}
                      >

                      </div>

                    </div>
                    <h1 className='px-4'>{task.progress}%</h1>
                  </div>

                </div>

              ))}
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageTasks