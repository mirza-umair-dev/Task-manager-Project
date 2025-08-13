import React, { useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const SearchableDropDown = ({ options, label, placeholder,name,value=[],onChange }) => {
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selected.some(sel => sel.name === option.name) 
  );

  const handleSelect = (option) => {
     const newValue = [...value, option];
    onChange({ target: { name, value: newValue } });
    setSelected([...selected, option]);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleRemove = (option) => {
   const newValue = value.filter(sel => sel._id !== option._id);
    onChange({ target: { name, value: newValue } });
    setSelected(selected.filter(sel => sel._id !== option._id));
  };
  useEffect(() => {
  setSelected(value || []);
}, [value]);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <div
        className="relative px-3 py-3 flex flex-wrap items-center gap-2 bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Show selected users as chips */}
        {selected.length > 0 ? (
          selected.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking chip
            >
              {user.name}
              <IoClose
                className="cursor-pointer"
                onClick={() => handleRemove(user)}
              />
            </div>
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        <FaAngleDown
          className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute top-full left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-lg mt-2 shadow-md z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none px-3 py-2 bg-gray-100 border-b border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropDown;
