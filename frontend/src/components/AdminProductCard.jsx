import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import EditProduct from './EditProduct';
import displayINRCurrency from '../helpers/displayCurrency';



const AdminProductCard = ({ product, index, callFunc }) => {
    const [openEditProductBox, setOpenEditProductBox] = useState("");


    return (
        <div key={index} className=' bg-white p-2 border-1 rounded-md cursor-pointer  w-40 flex flex-col justify-between h-[250px]'>
            <div className=' h-32 w-32 flex justify-center items-center mx-auto'>
                <img src={product?.productImage[0]} alt='productImage' className=' object-fill h-full'></img>
            </div>
            <h1 className='  text-ellipsis line-clamp-1'>{product.productName}</h1>
            <p className=' font-bold mt-1 mr-auto'>
                {
                    displayINRCurrency(product.sellingPrice)
                }
            </p>

            <div className=' w-fit rounded-full p-1 block ml-auto mt-1 cursor-pointer bg-green-100 hover:bg-green-500 hover:text-white'
                onClick={() => {
                    setOpenEditProductBox(true);
                }}>
                <EditIcon></EditIcon>
            </div>


            {
                openEditProductBox && (
                    <EditProduct onClose={() => setOpenEditProductBox(false)} product={product} callFunc={callFunc}></EditProduct>
                )
            }
        </div>
    )
}

export default AdminProductCard
