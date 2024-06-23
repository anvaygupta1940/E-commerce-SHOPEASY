import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop.js';
import displayCurrency from "../helpers/displayCurrency.js";
import addToCart from '../helpers/addToCart.jsx';
import { Context } from '../context/index.js';
import { Link } from 'react-router-dom';



const SearchCardProduct = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    }
    return (
        <div className=' grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-start gap-10 overflow-x-scroll scrollbar-none transition-all'>
            {
                loading ? (
                    loadingList.map((el, index) => {
                        return (
                            <div className=' w-full min-w-[280px] max-w-[280px] md:max-w-[300px] md:min-w-[300px]  shadow-sm  rounded-md bg-white' key={index}>
                                <div className=' bg-slate-200 min-w-[280px] md:min-w-[145px] h-48 p-2 flex justify-center items-center animate-pulse'></div>
                                <div className=' p-2  grid gap-3 w-full'>
                                    <p className=' text-ellipsis line-clamp-1 text-lg font-semibold px-1 py-3 animate-pulse rounded-full bg-slate-200'></p>
                                    <p className=' capitalize text-slate-500 font-medium animate-pulse px-1 py-3 rounded-full bg-slate-200'></p>
                                    <div className=' flex items-center gap-5 w-full'>
                                        <p className=' text-red-500 bg-slate-200 w-full px-1 py-3 rounded-full animate-pulse'></p>
                                        <p className=' text-slate-500 line-through bg-slate-200 w-full px-1 py-3 rounded-full animate-pulse'></p>
                                    </div>
                                    <button className=' px-3 py-1  w-full rounded-full text-white  bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) => {
                        return (
                            <Link to={"/product/" + product?._id} className=' w-full min-w-[280px] max-w-[280px] md:max-w-[320px] md:min-w-[320px]  shadow-sm  rounded-md bg-white' key={index}
                                onClick={scrollTop}>


                                <div className=' bg-slate-200 min-w-[280px] md:min-w-[145px] h-48 p-2 flex justify-center items-center'>
                                    <img alt='productImage' src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'></img>
                                </div>

                                <div className=' p-2  grid gap-3 '>
                                    <p className=' text-ellipsis line-clamp-1 text-lg font-semibold'>{product.productName}</p>
                                    <p className=' capitalize text-slate-500 font-medium'>{product.brandName}</p>
                                    <div className=' flex items-center gap-5'>
                                        <p className=' text-red-500'>{displayCurrency(product.sellingPrice)}</p>
                                        <p className=' text-slate-500 line-through'>{displayCurrency(product.price)}</p>
                                    </div>
                                    <button
                                        onClick={(e) => handleAddToCart(e, product?._id)} className=' px-3 py-1 bg-red-500 hover:bg-red-700 w-full rounded-full text-white'>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )}
        </div>
    )
}

export default SearchCardProduct
