import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import productCategory from '../helpers/productCategory';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadImage from '../helpers/uploadImage';
import FullScreenDisplay from './FullScreenDisplay';
import DeleteIcon from '@mui/icons-material/Delete';
import SummaryApi from '../common';
import { toast } from "react-toastify";






const EditProduct = ({
    onClose,
    product,
    callFunc
}) => {
    const [data, setData] = useState({
        ...product,
        productName: product?.productName,
        brandName: product?.brandName,
        category: product?.category,
        productImage: product?.productImage || [],
        description: product?.description,
        price: product?.price,
        sellingPrice: product?.sellingPrice
    });

    // hooks for displaying uploaded image on full screen
    const [openFullScreenDisplayBox, setOpenFullScreenDisplayBox] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");


    // handle change in input fields
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });

        // console.log(data);
    }

    // handles image upload in cloudinary
    const handleEditProductImage = async (e) => {
        const file = e.target.files[0];
        // setUploadProductImageInput(file.name);
        // console.log(uploadProductImageInput);
        // console.log("File >>", file);

        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

        // console.log("upload image cloudinary >>", uploadImageCloudinary.url);
    }

    // handle delete product image
    const deleteProductImage = async (index) => {
        // console.log("index >>", index);

        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        });
    }

    // edit new product
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await res.json();

        // console.log("Result of product updated >> ", result);

        if (result.success) {
            toast.success(result.message);
            onClose();
            callFunc();
        }
        if (result.error) {
            toast.error(result.message);
        }
    }

    return (
        <div className=' fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className=' bg-white w-full max-w-2xl h-full max-h-[80%] rounded p-4 overflow-hidden'>
                <div className=' flex justify-between items-center pb-4'>
                    <h2 className=' font-bold text-lg'>Edit Product</h2>
                    <button onClick={onClose} className=' text-lg hover:text-red-500'>
                        <CloseIcon></CloseIcon>
                    </button>
                </div>
                <form className=' grid gap-2 p-4 overflow-y-scroll h-full pb-10' onSubmit={handleSubmit}>

                    {/* here we have used id because when we click on label , it will automatically focus on input box */}
                    <label htmlFor='productName'>Product Name :</label>
                    <input type='text' placeholder=' Enter product name' id='productName' className=' p-2 bg-slate-200 rounded outline-none mb-4'
                        value={data.productName} name='productName' required onChange={(e) => { handleOnChange(e) }}>
                    </input>

                    <label htmlFor='brandName'>Brand Name :</label>
                    <input type='text' placeholder=' Enter brand name' id='brandName' className=' p-2 bg-slate-200 rounded outline-none mb-4'
                        value={data.brandName} name='brandName' required onChange={(e) => { handleOnChange(e) }}>
                    </input>

                    <label htmlFor='category'>Category :</label>
                    <select value={data.category} id='category' name='category' className=' p-2 bg-slate-200 rounded outline-none mb-4'
                        onChange={handleOnChange} required>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className=' h-32 bg-slate-200 p-2 border rounded w-full flex items-center justify-center cursor-pointer '>
                            <div className=' text-slate-500 flex items-center justify-center flex-col gap-2'>
                                <span className=''><CloudUploadIcon></CloudUploadIcon></span>
                                <p className=' text-lg'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className=' hidden' onChange={handleEditProductImage}></input>
                            </div>
                        </div>
                    </label>

                    <div className=' mb-3 flex items-center gap-2'>
                        {
                            // if any image is present then only show it
                            data?.productImage[0] ? (

                                data.productImage.map((elem, index) => {
                                    return (
                                        <div className=' relative p-2 group'>
                                            <img src={elem} alt='productImage' key={index} height={100} width={100} className=' border bg-slate-200 cursor-pointer rounded'
                                                onClick={() => {
                                                    setFullScreenImage(elem);
                                                    setOpenFullScreenDisplayBox(true);
                                                }}>
                                            </img>
                                            <div className=' absolute bottom-0 right-0 p-1 bg-red-700 text-white rounded-full cursor-pointer hidden group-hover:block'
                                                onClick={() => deleteProductImage(index)}>
                                                <DeleteIcon></DeleteIcon>
                                            </div>
                                        </div>

                                    )
                                })

                            ) : (
                                <p className=' text-red-500 text-xs'>*Please upload product Image</p>
                            )
                        }
                    </div>

                    <label htmlFor='price'>Price :</label>
                    <input type='number' placeholder=' Enter price' id='price' className=' p-2 bg-slate-200 rounded outline-none mb-4'
                        value={data.price} name='price' required onChange={(e) => { handleOnChange(e) }}>
                    </input>

                    <label htmlFor='sellingPrice'>Selling Price :</label>
                    <input type='number' placeholder=' Enter selling price' id='sellingPrice' className=' p-2 bg-slate-200 rounded outline-none mb-4'
                        value={data.sellingPrice} name='sellingPrice' required onChange={(e) => { handleOnChange(e) }}>
                    </input>

                    <label htmlFor='description'>Description :</label>
                    <textarea className=' h-28 bg-slate-100 resize-none p-1 rounded border outline-none mb-3' placeholder='Enter product description'
                        onChange={handleOnChange} value={data.description} required name='description'>
                    </textarea>


                    <button type='submit' className=' bg-red-600 p-2 text-white hover:bg-red-700 mb-3 rounded'>Edit Product</button>
                </form>
            </div>


            {/* Display image in full screen  */}
            {
                openFullScreenDisplayBox && (
                    <FullScreenDisplay
                        imgUrl={fullScreenImage}
                        onClose={() => setOpenFullScreenDisplayBox(false)}></FullScreenDisplay>
                )
            }
        </div>
    )
}

export default EditProduct
