import React from 'react'
import cancelGif from "../assest/cancel.gif"
import { Link } from "react-router-dom";


const Cancel = () => {
    return (
        <div className=' w-full max-w-sm mx-auto bg-slate-200 rounded m-2 p-4 flex items-center justify-center flex-col'>
            <img
                src={cancelGif}
                width={150}
                height={150}
                className=' mix-blend-multiply'>
            </img>
            <p className=' text-lg text-red-600 font-bold'>Payment Cancel</p>
            <Link to={"/cart"} className=' p-3 px-4 m-3 cursor-pointer border-2 rounded text-red-600 font-semibold border-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
        </div>
    )
}

export default Cancel
