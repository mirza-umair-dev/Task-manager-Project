import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import CustomDropdown from '../../components/CustomDropdown'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/ApiPaths'
import SearchableDropDown from '../../components/SearchableDropDown'
import Attachments from '../../components/Attachments'
import { toast } from 'react-toastify'
import TodoList from '../../components/TodoList'
import { useParams } from 'react-router-dom'

const CreateTask = () => {
  const [users, setUsers] = useState([]);
  const [error, seterror] = useState('');
  const {id} = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duedate: '',
    priority: '',
    status: '',
    assignedTo: [],
    todoChecklist: [],
    attachments: []
  });

  // If taskId is provided, fetch the task details
  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

      if (response.data) {
        const taskInfo = response.data;
        setFormData(
          (prevState) => ({
            title: taskInfo.title,
            description: taskInfo.description,
            duedate: new Date(taskInfo.duedate).toISOString().split('T')[0],
            priority: taskInfo.priority,
            status: taskInfo.status,
            assignedTo: taskInfo.assignedTo.map(user => ({
              _id: user._id,
              name: user.name
            }
            )),
            todoChecklist: taskInfo?.todoChecklist?.map((item) => ({
              text: item.text,
              completed: item.completed
            }
          )) || [],
            attachments: taskInfo.attachments || []
          }));

      } 

    }
    catch (error) {
        console.error("Error fetching task details:", error);
        toast.error("Failed to fetch task details");
      }
    }

    const updateTask = async () => {
  try {
    const todolist = formData.todoChecklist.map(todo => ({
      text: todo.text,
      completed: todo.completed || false
    }));

    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TASK(id),
      {
        ...formData,
        todoChecklist: todolist,
        assignedTo: formData.assignedTo.map(user => user._id),
        duedate: new Date(formData.duedate).toISOString(),
      }
    );

    window.history.back();
    toast.success("Task updated successfully!");
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task");
  }
};

const deleteTask = async () => {
  try {
    const response = await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(id));
    toast.success("Task deleted successfully!");
    setFormData({
      title: '',  
      description: '',
      duedate: '',
      priority: '',
      status: '',
      assignedTo: [],
      todoChecklist: [],
      attachments: []
    });
    window.history.back();
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task");
  }
}

  // Handles normal inputs + arrays
  const InputHandler = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getUsers = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    useEffect(() => {
      const fetchUsers = async () => {
        await getUsers();
      };
      fetchUsers();

      if (id) {
        getTaskDetailsById();
      }
    }, [id]);

    // Handle POST request
    const handleCreateTask = async () => {
      try {
        const todolist = formData.todoChecklist.map(todo => ({
          text: todo.text,
          completed: false
        }));

        if(!formData.title) {
          seterror('* Title is required');
          return;
        }
        if(!formData.description) {
          seterror('* Description is required');
          return;
        } 
        if(!formData.duedate) {
          seterror('* Due date is required');
          return;
        } 
        if(!formData.priority) {
          seterror('* Priority is required');
          return;
        }
        if(!formData.status) {
          seterror('* Status is required');
          return;
        }
        if(formData.assignedTo.length === 0) {
          seterror('* At least one user must be assigned');
          return;
        }


        const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
          ...formData,
          todoChecklist: todolist,
          assignedTo: formData.assignedTo.map(user => user._id),
          duedate: new Date(formData.duedate).toISOString(),

        });
        toast.success("Task created successfully!");

        setFormData({
          title: '',
          description: '',
          duedate: '',
          priority: '',
          status: '',
          assignedTo: [],
          todoChecklist: [],
          attachments: []
        });
      } catch (error) {
        console.error("Error creating task:", error);
      }
      window.history.back();
    };

    return (
      <DashboardLayout>
        <div className='flex flex-col w-full h-full border-l border-gray-200 bg-gray-50'>
          <div className='bg-white px-4 sticky z-50 top-10 right-0 py-3 border-b border-gray-200 '>
            <h1 className='text-2xl font-semibold text-gray-900'>{id ? 'Update Task' :'Create New Task' }</h1>
            <p className='text-sm text-gray-500'>Fill in the details to create a new task</p>
          </div>

          <div className='flex flex-col gap-4 p-4'>
            {/* Basic Information */}
            <div className='flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md'>
              <h1 className='text-xl font-semibold'>Basic Information</h1>
              <input
                placeholder='Enter task title'
                type='text'
                name='title'
                value={formData.title}
                onChange={InputHandler}
                className='bg-gray-100 rounded-lg border-gray-200 hover:border-gray-400 border w-full px-3 py-2 outline-none'
              />

              <div className='flex flex-col gap-4 mt-4'>
                <label className='text-sm text-gray-600'>Description *</label>
                <textarea
                  name='description'
                  placeholder='Provide detailed information about the task...'
                  value={formData.description}
                  onChange={InputHandler}
                  className='bg-gray-100 rounded-lg min-h-52 resize-none border-gray-200 hover:border-gray-400 border outline-none px-4 py-2'
                ></textarea>
              </div>
            </div>

            {/* Task Details */}
            <div className='flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md'>
              <h1 className='text-xl font-semibold'>Task Details</h1>
              <input
                type='date'
                name='duedate'
                value={formData.duedate}
                onChange={InputHandler}
                className='bg-gray-100 rounded-lg border-gray-200 hover:border-gray-400 border w-full px-3 py-2 outline-none'
              />

              <div className='flex flex-col gap-4 mt-4 w-full'>
                <CustomDropdown
                  options={['low', 'medium', 'high']}
                  label='Priority'
                  placeholder='Select Priority'
                  name='priority'
                  value={formData.priority}
                  onChange={InputHandler}
                />

                <CustomDropdown
                  options={['pending', 'in-progress', 'completed']}
                  label='Status'
                  placeholder='Select Status'
                  name='status'
                  value={formData.status}
                  onChange={InputHandler}
                />

                <SearchableDropDown
                  options={users}
                  label='Assign To'
                  placeholder='Select User'
                  name='assignedTo'
                  onChange={InputHandler}
                  value={formData.assignedTo}
                />

                <TodoList
                  todoList={formData.todoChecklist}
                  name='todoChecklist'

                  settodoList={(newList) => setFormData((prev) => ({ ...prev, todoChecklist: newList }))}
                />
              </div>
            </div>

            {/* Attachments */}
            <div className='flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md mt-4'>
              <h1 className='text-xl font-semibold'>Add Attachments</h1>
              <Attachments
                name='attachments'
                value={formData.attachments}
                onChange={InputHandler}
              />
            </div>
            {error && (
              <div  className='text-red-500 text-md px-4'>
              {error}
                </div>
            )
                }
          </div>

          <div className='sticky bottom-0 right-0 w-full h-12 grid grid-cols-2 gap-4 bg-white z-10 px-4 py-3 border-t border-gray-200'>
            <button
              className='bg-red-600 px-3 py-3 rounded-lg text-white hover:bg-red-900 transition duration-300'
              onClick={id ? deleteTask : () => window.history.back()}
            >
              {id ? 'Delete' : 'Back'}
            </button>
            <button
              className='bg-blue-600 px-3 py-3 rounded-lg text-white hover:bg-blue-900 transition duration-300'
              onClick={id ? updateTask : handleCreateTask}
            >
              {id ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  };

  export default CreateTask;
