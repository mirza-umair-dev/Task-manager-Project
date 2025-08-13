import React, { useRef, useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";

const Profilepic = ({ image, setImage, setImageError }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            setImageError('Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.');
            setPreviewUrl(null);
            setImage(null);
            return;
        }

        setImageError('');
        setImage(file);
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    };

    const handleRemoveImg = () => {
        setPreviewUrl(null);
        setImage(null);
        setImageError('');
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!image ? (
                <div className="w-20 h-20 rounded-full bg-green-100/50 flex items-center justify-center relative p-4">
                    <FaRegUser className="text-4xl text-green-400" />
                    <button
                        type="button"
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-green-400 rounded-full absolute -bottom-1 -right-1 text-white"
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="profilepic"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImg}
                        className="w-8 h-8 flex items-center justify-center bg-red-400 rounded-full absolute -bottom-1 -right-1 text-white"
                    >
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profilepic;
