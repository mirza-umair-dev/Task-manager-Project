import { UserContext } from '../../context/UserProvider'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment'
import TaskStatusBox from '../../components/TaskStatusBox';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import StatusPieChart from '../../components/charts/StatusPieChart';
import DailyBarChart from '../../components/charts/DailyBarChart';

import { FaRegCheckCircle, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, getStatusIcon, getPriorityColor } = useContext(UserContext);
  const [dasshboardData, setdasshboardData] = useState('');
  const [taskData, settaskData] = useState('')

  const fetchdasshboardData = async () => {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
    setdasshboardData(response.data);

  }

  const fetchTaskData = async () => {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS);
    settaskData(response.data);
  }
  useEffect(() => {

    fetchdasshboardData();
    fetchTaskData();
  }, [])

  return (
    <DashboardLayout >
      <div className='px-1 lg:px-6 w-full bg-gray-50'>
        <div>
          <div className='flex py-2 flex-col'>
            <h1 className='text-xl font-semibold'>Welcome {user?.user.name}</h1>
            <span className='text-sm text-gray-600'>{moment().format('LL')}</span>
          </div>


          {dasshboardData?.stats &&
            (
              <div className='px-2 py-2 bg-white border-gray-200 border shadow-md rounded-lg'>
                <div className='grid lg:grid-cols-4 gap-4 grid-cols-2'>
                  <TaskStatusBox text={'Total Tasks'} count={dasshboardData.stats.assignedCount || 0} bgColor={'bg-blue-500'} />
                  <TaskStatusBox text={'Completed Tasks'} count={dasshboardData.stats.completedCount || 0} bgColor={'bg-green-500'} />
                  <TaskStatusBox text={'Pending Tasks'} count={dasshboardData.stats.pendingCount || 0} bgColor={'bg-red-500'} />
                  <TaskStatusBox text={'In-Progress Tasks'} count={dasshboardData.stats.inProgressCount
                    || 0} bgColor={'bg-purple-500'} />

                </div>
              </div>
            )}


          {dasshboardData?.charts &&
            (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mt-6 p-2'>
                <StatusPieChart data={dasshboardData.charts.statusChart} className='w-full h-full' />
                <DailyBarChart data={dasshboardData.charts.priorityChart} className='w-full h-full' />
              </div>



            )
          }


          {taskData?.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 mt-6">
              <div className="p-6 border-b border-gray-200 flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
                <button className='px-3 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-800 transition duration-500'><Link to='/user/my-tasks'>See All</Link></button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase  border-b border-gray-200">
                        Status
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase  border-b border-gray-200">
                        Title
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase  border-b border-gray-200">
                        Assigned To
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase  border-b border-gray-200">
                        Priority
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase  border-b border-gray-200">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {taskData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((task) => (
                      <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(task.status)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {task.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex gap-2">
                            {task.assignedTo ? task.assignedTo.map((assignee, index) =>
                              (<span key={index} > {assignee.name}</span>)
                            ) : "Myself"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md capitalize ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {task.duedate ? new Date(task.duedate).toLocaleDateString() : "N/A"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


        </div>
      </div>
    </DashboardLayout>
  )
}

export default UserDashboard