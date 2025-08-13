import React, { useState, useEffect } from 'react'
import { RiAttachmentLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const Attachments = ({ name, value = [], onChange }) => {
    const [attachments, setAttachments] = useState(value);
    const [input, setInput] = useState('');

    
    useEffect(() => {
        setAttachments(value);
    }, [value]);

   
    const updateParent = (updatedList) => {
        setAttachments(updatedList);
        onChange({ target: { name, value: updatedList } });
    };

    const addAttachment = () => {
        if (input.trim()) {
            const updatedList = [...attachments, input.trim()];
            updateParent(updatedList);
            setInput('');
        }
    };

    const deleteAttachment = (index) => {
        const updatedList = attachments.filter((_, i) => i !== index);
        updateParent(updatedList);
    };

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="attachment" className='text-sm text-gray-600'>Add Attachments</label>
            <div className='flex items-center w-full justify-between rounded-lg bg-gray-100'>
                <div className='px-3 py-3 text-lg'><RiAttachmentLine /></div>
                <input
                    type="text"
                    placeholder='Paste link here...'
                    className='w-[85%] px-3 py-3 border-none outline-none'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type='button'
                    className='bg-blue-600 text-white px-4 py-3 hover:bg-blue-900 transition duration-300 rounded-lg'
                    onClick={addAttachment}
                >
                    Add
                </button>
            </div>

            {attachments.length > 0 && (
                <div className='flex flex-col gap-2 mt-2 px-8 rounded-lg py-3'>
                    <h1 className='text-sm text-gray-600'>Attachments</h1>
                    {attachments.map((attachment, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-between gap-2 w-full bg-gray-100 px-3 py-2 border border-gray-200 rounded-lg'
                        >
                            <span className='text-gray-700 break-all'>{attachment}</span>
                            <button onClick={() => deleteAttachment(index)}>
                                <FaTrash className='text-red-400 text-lg' />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Attachments;
