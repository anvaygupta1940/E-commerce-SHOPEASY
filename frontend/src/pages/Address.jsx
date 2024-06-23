import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAddress } from '../redux/addressRedux';

const Address = () => {
    const [fullName, setFullName] = useState("");
    const [number, setNumber] = useState("");
    const [flat, setFlat] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");
    const [town, setTown] = useState("");
    const [state, setState] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Clicked");
        dispatch(addAddress({
            fullName,
            number,
            flat,
            area,
            landmark,
            town,
            state
        }));
        navigate("/");
    }


    return (
        <div className=' container mx-auto p-4 bg-gray-200 flex items-center justify-center'>

            <div className=' w-full md:w-[55%] border border-slate-500 p-2 grid gap-2'>

                <div className=' w-full grid gap-1'>
                    <p className=' font-semibold'>Full Name</p>
                    <input type='text'
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <div>
                    <p className=' font-semibold'>Phone Number</p>
                    <input type='text'
                        value={number}
                        onChange={(e) => { setNumber(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <div>
                    <p className=' font-semibold'>Flat,House no,Building,Company,Apartment</p>
                    <input type='text'
                        value={flat}
                        onChange={(e) => { setFlat(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <div>
                    <p className=' font-semibold'>Area,Colony,Street,Sector,Village</p>
                    <input type='text'
                        value={area}
                        onChange={(e) => { setArea(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <div>
                    <p className=' font-semibold'>Landmark</p>
                    <input type='text'
                        value={landmark}
                        onChange={(e) => { setLandmark(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <div>
                    <p className=' font-semibold'>Town/City</p>
                    <input type='text'
                        value={town}
                        onChange={(e) => { setTown(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <div>
                    <p className=' font-semibold'>State</p>
                    <input type='text'
                        value={state}
                        onChange={(e) => { setState(e.target.value) }}
                        className=' w-full py-1 outline-none rounded px-2'
                    ></input>
                </div>
                <button
                    onClick={handleClick}
                    className=' cursor-pointer h-[35px] w-[200px] bg-red-500 mx-auto rounded-md text-white font-bold my-3 hover:scale-110'>
                    Deliver to this Address
                </button>
            </div>
        </div>
    )
}

export default Address
