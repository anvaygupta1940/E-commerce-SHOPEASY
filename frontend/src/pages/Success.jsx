import React from 'react'
import successGif from "../assest/success.gif"
import { Link } from "react-router-dom";


const Success = () => {
    return (
        <div className=' w-full max-w-sm mx-auto bg-slate-200 rounded m-2 p-4 flex items-center justify-center flex-col'>
            <img
                src={successGif}
                width={150}
                height={150}>
            </img>
            <p className=' text-lg text-green-600 font-bold'>Payment Successfull !!!</p>
            <Link to={"/order"} className=' p-3 px-4 m-3 cursor-pointer border-2 rounded text-green-600 font-semibold border-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
        </div>
    )
}

export default Success
