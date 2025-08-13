import { API_PATHS } from "./ApiPaths";
import axiosInstance from "./axiosInstance";

const UploadImg = async  (ImageFile) => {
    const formData = new FormData();
    formData.append('profileimage',ImageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE , formData, {
headers:{
    "Content-Type": 'multipart/form-data',
},
        });
        return response.data;
        
    } catch (error) {
        console.error('Error uploading Image',error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('An error occurred while uploading the image.');
        }
        alert(error.response.data);
        throw error;
    }
};


export default UploadImg;