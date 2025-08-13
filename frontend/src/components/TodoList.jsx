import React from 'react'
import { useState } from 'react'
import { FaTrash } from "react-icons/fa";


const TodoList = ({ todoList, settodoList }) => {
    const [option, setoption] = useState('');

    const addTodo = () => {
        if (option.trim()) {
           settodoList([...todoList, { text: option.trim(), completed: false }]);
            setoption('');
        }
    }

    const deleteTodo = (index) => {
        const updatedTodoList = todoList.filter((_, i) => i !== index);
        settodoList(updatedTodoList);
    }

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="todo" className='text-sm text-gray-600'>Todo Checklist</label>
            <div className='flex items-center gap-2 w-full justify-between rounded-lg bg-gray-100'>
                <input
                    type="text"
                    placeholder='Enter Todo'
                    className='lg:w-[85%] w-[70%] p-3  border-none outline-none'
                    value={option}
                    id='todo'
                    onChange={({ target }) => setoption(target.value)}
                />
                <button
                    type='button'
                    className='lg:px-3 p-3 text-sm lg:py-3 bg-blue-600 hover:bg-blue-900 transition duration-300 rounded-lg text-white'
                    onClick={addTodo}
                >
                    Add Todo
                </button>
            </div>


            {todoList.map((todo, index) => (
                <div
                    key={index}
                    className='flex items-center justify-between gap-2 w-full bg-gray-100 px-3 py-2 border border-gray-200 rounded-lg'
                >
                    <div
                        className='w-full flex items-center gap-2 cursor-pointer'

                    >
                        <span className='text-gray-500 text-sm'>
                            {todo.text}
                        </span>
                    </div>
                    <button onClick={() => deleteTodo(index)}>
                        <FaTrash className='text-red-400 text-lg' />
                    </button>
                </div>
            ))}
        </div>
    )
}


export default TodoList