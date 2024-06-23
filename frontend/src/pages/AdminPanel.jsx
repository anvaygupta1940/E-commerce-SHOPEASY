import React, { useEffect } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from "react-router-dom"
import ROLE from "../common/role";


const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);
    return (
        <div className=' min-h-[calc(100vh-120px)] md:flex hidden'>
            {/* left  */}
            <aside className='min-h-full w-full max-w-60 bg-white customShadow'>
                <div className=' h-32  flex flex-col justify-center items-center '>
                    <div className=' rounded-full cursor-pointer w-[70px] h-[70px] overflow-hidden flex items-center justify-center object-cover '>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={user.name} className=' w-full h-full'></img>)
                                : (
                                    <PersonOutlineIcon style={{ width: "40", height: "40" }}></PersonOutlineIcon>
                                )
                        }
                    </div>
                    <p className=' font-bold capitalize text-lg'>{user?.name}</p>
                    <p className=' text-sm'>{user?.role}</p>
                </div>
                <div className=' grid p-4'>
                    <Link to={"all-users"} className=' px-2 py-1 hover:bg-slate-200'>All Users</Link>
                    <Link to={"all-products"} className=' px-2 py-1 hover:bg-slate-200'>All Products</Link>
                    <Link to={"all-orders"} className=' px-2 py-1 hover:bg-slate-200'>All Orders</Link>
                </div>
            </aside>
            {/* right */}
            <main className=' p-2 w-full h-full'>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default AdminPanel
