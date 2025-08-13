import React, { useContext, useState } from 'react';
import Profilepic from '../../components/Profilepic';
import { BsEmojiLaughing } from "react-icons/bs";
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import UploadImg from '../../utils/uploadImg';
import { UserContext } from '../../context/UserProvider';
import SignUpPopUp from '../../components/SignUpPopUp';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [adminInvite, setAdminInvite] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    // Check image error before continuing
    if (imageError) {
      setError(imageError);
      return;
    }

    if (!fullName || !email || !password) {
      setError('Please fill all the fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be 8 characters long');
      return;
    }

    setSignedUp(true);

    let profileImgURL = null;
    if (profilePic) {
      try {
        const imageUploadRes = await UploadImg(profilePic);
        profileImgURL = imageUploadRes.imageUrl || '';
      } catch (error) {
        console.error('Upload failed', error);
        profileImgURL = null;
      }
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        adminInviteToken: adminInvite,
        profileImgUrl: profileImgURL
      });

      const { role, token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
      }
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('Registration error', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong!');
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-between">
      <div className="p-10 flex gap-4 flex-col items-center justify-between xl:w-1/2 w-full">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm md:text-lg">Join us today by entering your details below</p>
        </div>
        <form onSubmit={submitHandler} className="flex items-center flex-col justify-center w-full gap-3">
          <Profilepic image={profilePic} setImage={setProfilePic} setImageError={setImageError} />
          <div className="grid md:grid-cols-2 gap-2 grid-cols-1 w-full">
            <Input
              value={fullName}
              type="text"
              label="Enter Fullname"
              placeholder="Mirza Umair"
              onChange={({ target }) => setFullName(target.value)}
            />
            <Input
              type="email"
              placeholder="roman@example.com"
              label="Email Address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Input
              type="password"
              placeholder="Min 8 characters..."
              label="Enter Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Input
              type="number"
              placeholder="5 Digits"
              label="Admin Invite Token"
              value={adminInvite}
              onChange={({ target }) => setAdminInvite(target.value)}
            />
          </div>

          {(error || imageError) && (
            <p className="text-red-700 text-sm">{error || imageError}</p>
          )}

          <button
            type="submit"
            className="bg-[#262424] p-3 rounded-xl text-[#f7f7f7] hover:bg-[#505050] hover:transition-colors w-full"
          >
            SIGNUP
          </button>
          <div className="text-sm flex w-full gap-2">
            <p>Already have an account?</p>
            <Link to="/auth/login" className="text-blue-800 underline">
              login
            </Link>
          </div>
        </form>
      </div>
      <div className="w-3/7 h-full bg-[url(/images/signinpic1.jpg)] bg-cover bg-center xl:flex items-center justify-center hidden">
        <div className="flex flex-col w-2/3 h-1/3 items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg p-2">
          <BsEmojiLaughing size={50} color="white" />
          <h1 className="text-3xl font-semibold text-white mb-2">Welcome</h1>
          <p className="text-white/80 text-center">
            Your future is created by what you do today, not tomorrow
          </p>
        </div>
      </div>
      {signedUp && (
        <div className="absolute w-screen h-screen top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <SignUpPopUp />
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
