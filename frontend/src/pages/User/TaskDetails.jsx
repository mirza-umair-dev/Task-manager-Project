import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatusColorBadge from '../../components/StatusColorBadge';
import { UserContext } from '../../context/UserProvider';

const TaskDetails = () => {
  const [task, settask] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const { id } = useParams();

  const getTaskById = async () => {

    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      settask(response.data);
      setisLoading(false);

    } catch (error) {
      console.error("Error fetching task details:", error);
      setisLoading(false);
    }

  }


  const { getPriorityColor } = useContext(UserContext);

  const updateChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];

    const taskId = id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
    }

    try {
      const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_CHECKLIST(taskId), { todoChecklist });
      if (response.status === 200) {
        settask(response.data)
        getTaskById();
      }
    } catch (error) {
      console.error(error);

    }
  }

  useEffect(() => {
    getTaskById();


  }, [id])

  return (
    <DashboardLayout >
      <div className='px-4 py-2 w-full'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className='p-1 lg:p-4'>
            <h1 className='text-lg lg:text-2xl  font-semibold mb-4'>Task Info</h1>
            {task ? (
              <div className='bg-white shadow-md rounded-md w-full '>

                <div className='flex items-center justify-between text-white bg-blue-600 rounded-t-lg px-4 py-8' >
                  <h2 className=' text-md lg:text-xl font-semibold'>{task.title}</h2>
                  <StatusColorBadge status={task.status} />
                </div>

                <div className='p-4'>
                  <div className='mt-4 p-4 bg-gray-50 rounded-lg flex flex-col gap-2 border border-gray-100'>
                    <h2 className='font-bold'>Description</h2>
                    <p className=''>{task.description}</p>
                  </div>
                  <div className='mt-6 grid grid-cols-2 gap-6'>
                    <div className='bg-blue-50 p-4 border border-blue-200 rounded-lg'>
                      <h2 className='font-bold'>Priority Level</h2>
                      <p className={`${getPriorityColor(task.priority)} mt-2 inline-block px-3 py-2 rounded-lg font-semibold`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                    </div>
                    <div className='bg-blue-50  p-4 border border-blue-200 rounded-lg'>
                      <h2 className='font-bold'>Due Date</h2>
                      <p className='mt-2'>{new Date(task.duedate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className='mt-6 bg-blue-50 p-4 border border-blue-200 rounded-lg'>
                    <h2 className='font-bold'>Assigned Team Members ({task.assignedTo.length})</h2>
                    <div className='grid grid-cols-2 gap-2 py-2'>
                      {task.assignedTo?.map((user, index) => (
                        <div key={index} className='flex items-center gap-3 bg-white rounded-lg px-2 py-2 border border-blue-200 shadow'>
                          <div className='w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center'>{user?.name?.charAt(0).toUpperCase()}</div>
                          <div >
                            <h2 className='font-semibold'>{user.name}</h2>
                            <p className='text-gray-600 '>{user.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='p-4 bg-blue-50 border border-blue-200 mt-4 rounded-lg'>
                     <div><label className='font-semibold' > Task Progress</label></div>
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
                  <div className='mt-6 bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4'>
                    <div className='flex justify-between items-center'>
                      <label className=' font-bold'>Todo Checklist</label>
                      <div className='px-3 py-2 border-blue-600 text-blue-600 border rounded-lg text-sm font-semibold'>{task.todoChecklist.filter(item => item.completed).length} / {task.todoChecklist.length} completed</div>
                    </div>


                    {task.todoChecklist.map((item, index) => (

                      <TodoChecklist
                        key={index}
                        onChange={() => updateChecklist(index)}
                        text={item.text}
                        isChecked={item?.completed}
                      />

                    ))}
                  </div>
                </div>


              </div>
            ) : (
              <p>No task found.</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default TaskDetails;



const TodoChecklist = ({ text, isChecked, onChange, }) => {

  return (
    <div className='flex gap-2 items-center px-4 py-2 mt-2 bg-white border-blue-200 border rounded-lg'>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className='w-4 h-4 bg-gray-100 text-blue-600 rounded-lg outline-none border'
      />
      <p className=''>{text}</p>
    </div>
  )

}