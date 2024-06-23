import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from '../redux/userSlice';
import { Context } from '../context';


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const user = useSelector((state) => state?.user?.user);
    // console.log("header user details >>", user);
    const context = useContext(Context);

    // used to place the searched content in search bar
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery);



    const handleLogout = async () => {
        const res = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include"
        });

        const result = await res.json();

        if (result.success) {
            toast.success(result.message);
            dispatch(setUserDetails(null));
            navigate("/");
        }
        if (result.error) {
            toast.error(result.error);
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate("/search")
        }
    }
    // console.log("header add to cart product count >>", context);


    return (
        <header className='p-4 shadow-md bg-white fixed z-20 w-full h-16'>
            <div className=' flex justify-between items-center'>
                <Link to="/">
                    <p className=' font-bold text-[25px]'>ShopEasy</p>
                </Link>
                <div className=' hidden md:flex items-center justify-between max-w-sm w-full border rounded-full focus-within:shadow'>
                    <input type='text' className=' w-full pl-3 outline-none' placeholder='Search product here...' onChange={handleSearch} value={search}></input>
                    <div className=' text-lg w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'>
                        <SearchIcon style={{ color: "white" }}></SearchIcon>
                    </div>
                </div>
                <div className=' flex items-center gap-7'>
                    <div className=' relative group flex justify-center'>

                        {
                            user?._id && (
                                <div className=' rounded-full cursor-pointer w-[40px] h-[40px] overflow-hidden flex items-center justify-center '
                                    onClick={() => { setMenuDisplay(!menuDisplay) }}>
                                    {
                                        user?.profilePic ? (
                                            <img src={user?.profilePic} alt={user.name} className=' w-full h-full'></img>)
                                            : (
                                                <PersonOutlineIcon style={{ width: "40", height: "40" }}></PersonOutlineIcon>
                                            )}
                                </div>
                            )
                        }
                        {
                            menuDisplay && (
                                <div className=' absolute bottom-0 top-10 bg-white p-3 h-fit shadow-lg rounded-md hidden md:block'
                                    onClick={() => { setMenuDisplay(!menuDisplay) }}>
                                    {
                                        user?.role === "ADMIN" && (
                                            <nav>
                                                <Link to="/admin-panel/all-products" className=' whitespace-nowrap p-2 hover:bg-slate-200 hidden md:block'>Admin Panel</Link>
                                            </nav>
                                        )
                                    }
                                    <Link to={"/order"} className=' whitespace-nowrap p-2 hover:bg-slate-200 hidden md:block'>Order</Link>
                                </div>
                            )
                        }
                    </div>
                    {
                        user?._id && (
                            <Link to={"/cart"} className=' relative cursor-pointer'>
                                <ShoppingCartIcon></ShoppingCartIcon>
                                {
                                    context.cartProductCount !== 0 && (
                                        <div className=' h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-white absolute -top-2 -right-2'>
                                            <span>{context.cartProductCount}</span>
                                        </div>
                                    )
                                }

                            </Link>
                        )
                    }
                    {
                        user?._id ?
                            <button onClick={handleLogout} className=' px-3 py-1 cursor-pointer text-white bg-red-600 rounded-full'>LogOut</button>
                            :
                            <Link to="/login" className=' px-3 py-1 cursor-pointer text-white bg-red-600 rounded-full'>LogIn</Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
