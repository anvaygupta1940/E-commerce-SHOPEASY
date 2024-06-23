import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import logoGif from "../assest/signin.gif"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from "react-toastify";


const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handlePicUpload = async (e) => {
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file);
        // console.log("file >>", file);
        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        });
    }
    // console.log("Form data >> ", data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.confirmPassword === data.password) {
            const res = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            // console.log("new user result >>", result);
            if (result.success) {
                toast.success(result.message);
                navigate("/login");
            }
            if (result.error) {
                toast.error(result.message);
            }
        } else {
            toast.error("Password and confirm password doesn't match");
        }
    }


    return (
        <div className=' w-full p-6 '>
            <div className=' max-w-sm w-full mx-auto bg-white p-4 rounded-md'>
                <div className='h-20 w-20 mx-auto rounded-full mb-5 relative overflow-hidden'>
                    <img src={data.profilePic || logoGif} alt='signIn logo' className=''></img>
                    <form>
                        <label>
                            <div className=' cursor-pointer bg-slate-200 pt-1 pb-4 w-full opacity-80 absolute text-xs bottom-0 text-center'>
                                Upload Photo
                            </div>
                            <input type='file' className=' hidden' onChange={handlePicUpload}></input>
                        </label>

                    </form>
                </div>

                <form className=' flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className=''>
                        <label className=' font-semibold text-[18px]'>Name:</label>
                        <div className=' w-full bg-slate-100 rounded-md'>
                            <input type="text" placeholder='Enter your name'
                                value={data.name}
                                name='name'
                                onChange={(e) => handleOnChange(e)}
                                className=' bg-transparent w-full p-2 outline-none'
                                required></input>
                        </div>
                    </div>
                    <div className=''>
                        <label className=' font-semibold text-[18px]'>Email :</label>
                        <div className=' w-full bg-slate-100 rounded-md'>
                            <input type="email" placeholder='Enter email'
                                className=' bg-transparent w-full p-2 outline-none'
                                name='email'
                                value={data.email}
                                onChange={(e) => handleOnChange(e)}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className=''>
                        <label className=' font-semibold text-[18px]'>Password :</label>
                        <div className=' flex w-full justify-between items-center bg-slate-100'>
                            <input type={showPassword ? "text" : "password"} placeholder='Enter password'
                                className=' bg-transparent w-full p-2 outline-none rounded-md'
                                name='password'
                                value={data.password}
                                onChange={(e) => handleOnChange(e)}
                                required>
                            </input>
                            <div className=' cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ?
                                        <VisibilityIcon></VisibilityIcon>
                                        :
                                        <VisibilityOffIcon></VisibilityOffIcon>
                                }
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <label className=' font-semibold text-[18px]'>Confirm Password :</label>
                        <div className=' flex w-full justify-between items-center bg-slate-100'>
                            <input type={showConfirmPassword ? "text" : "password"} placeholder='Enter password'
                                className=' bg-transparent w-full p-2 outline-none rounded-md'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={(e) => handleOnChange(e)}
                                required
                            ></input>
                            <div className=' cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showConfirmPassword ?
                                        <VisibilityIcon></VisibilityIcon>
                                        :
                                        <VisibilityOffIcon></VisibilityOffIcon>
                                }
                            </div>
                        </div>
                    </div>
                    <button type='submit' className=' max-w-[200px] w-full p-2 bg-red-600 hover:bg-red-700 hover:scale-110 rounded-full text-white font-bold mx-auto block mt-4 '>Sign Up</button>
                </form>

                <p className=' mt-8 mb-8'>Already have account ? <Link to={"/login"} className=' text-red-600 cursor-pointer hover:text-red-700 hover:underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default SignUp
