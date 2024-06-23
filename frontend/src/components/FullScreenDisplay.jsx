import React from 'react'
import CloseIcon from '@mui/icons-material/Close';



const FullScreenDisplay = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className=' fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-45'>
            <div className=' shadow-lg rounded max-w-5xl bg-white h-fit p-4'>
                <button onClick={onClose} className=' text-lg hover:text-red-500 block ml-auto'>
                    <CloseIcon></CloseIcon>
                </button>
                <div className=' p-4 max-w-[80vw] max-h-[80vh]  flex justify-center'>
                    <img src={imgUrl} className=' w-full h-full'></img>
                </div>
            </div>
        </div>
    )
}

export default FullScreenDisplay
