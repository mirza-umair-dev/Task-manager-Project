import React, { useContext, useState } from 'react'
import Input from '../../components/Input';
import { BsEmojiLaughing } from "react-icons/bs";
import { Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/ApiPaths.js';
import { UserContext } from '../../context/UserProvider.jsx';

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        seterror('');
        if(!email || !password){
            seterror('Please fill all the fields');
            return;
        }
        if(password.length < 8){
            seterror('Password must be 8 characters long');
            return;
        }
        
        //api Call

       try {
         const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
            email,
            password
        });

         const {token , role} = response.data;
        if(token){
            localStorage.setItem('token', token)
        }
        const profileRes = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      updateUser({...profileRes.data,token})
        if(role === "admin"){
            navigate("/admin/dashboard")
        }
        else {
            navigate("/user/dashboard");
        }
        
       } catch (error) {
        console.error("Login error:", error);
        if(error.response && error.response.data.message){
            seterror(error.response.data.message)
        }
        else{
            seterror("Something went wrong!")
        }
       }
       
    }
    return (
        <div className='w-screen h-screen  flex items-center justify-between'>


            <div className='md:w-1/3 w-full h-full px-4 py-2 flex items-center justify-center flex-col gap-10'>
            <div className='flex items-start flex-col w-full px-4'><h1 className='text-2xl font-bold '>Sign In</h1>
            <p>Enter details to login</p></div>
                <div className='w-full px-4'>
                    <form className='flex flex-col gap-4'
                    onSubmit={submitHandler}
                    >
                        <Input
                        type="email"
                        placeholder='roman@example.com'
                        label='Email Adress'
                        value={email}
                        onChange={({ target }) => setemail(target.value)}
                    />
                        <Input
                        type="password"
                        placeholder='Min 8 characters...'
                        label='Enter Password'
                        value={password}
                        onChange={({ target }) => setpassword(target.value)}
                    />
                    {error && (
                        <p className='text-red-700 text-sm'>{error}</p>
                    )}
                    <button type='submit'
                    className='bg-[#262424] p-3 rounded-xl text-[#f7f7f7] hover:bg-[#505050] hover:transition-colors'
                    >SIGNIN</button>
                    <div className='text-sm flex items-center  gap-2'>
                        <p>Not have an account?</p>
                        <Link to='/auth/signup' className='text-blue-800 underline' >Signup</Link>
                    </div>
                    
                    </form>
                </div>
            </div>
            <div className='w-3/5 h-full bg-[url(/images/signinpic1.jpg)] bg-cover bg-center md:flex items-center justify-center hidden ' >
                <div className='flex flex-col w-2/3 h-1/3 items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg p-3'>
                <BsEmojiLaughing size={50}
                color='white' />
                    <h1 className='text-3xl font-semibold text-white mb-2'>Welcome Back</h1>
                    <p className='text-white/80'>Your future is created by what you do today, not tomorrow</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage