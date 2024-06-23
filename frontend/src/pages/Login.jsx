import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import logoGif from "../assest/signin.gif"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { Context } from '../context';


const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);



    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
            toast.success(result.message);
            navigate("/");
            fetchUserDetails();
            fetchUserAddToCart();
        }
        if (result.error) {
            toast.error(result.message);
        }
    }


    return (
        <div className=' w-full p-6 '>
            <div className=' max-w-sm w-full mx-auto bg-white p-4 rounded-md'>
                <div className='w-full'>
                    <img src={logoGif} alt='signIn logo' className=' h-20 w-20 mx-auto '></img>
                </div>

                <form className=' flex flex-col gap-2' onSubmit={handleSubmit}>
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
                                required
                            ></input>
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
                    <Link to="/forgot-password" className=' block text-end w-full cursor-pointer mb-7 hover:underline hover:text-red-700'>Forgot Password ?</Link>
                    <button type='submit' className=' max-w-[200px] w-full p-2 bg-red-600 hover:bg-red-700 hover:scale-110 rounded-full text-white font-bold mx-auto block'>Login</button>
                </form>

                <p className=' mt-8 mb-8'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 cursor-pointer hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login
