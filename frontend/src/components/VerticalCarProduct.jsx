import React, { useContext, useEffect, useRef, useState } from 'react'
import SummaryApi from '../common/index.js'
import displayCurrency from "../helpers/displayCurrency.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart.jsx';
import { Context } from '../context/index.js';


const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);

    const [scroll, setScroll] = useState(0);
    const scrollElem = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    }


    const fetchCategoryWiseProduct = async () => {
        setLoading(true);
        const res = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        });

        const result = await res.json();
        // console.log("Category wise product data >>>", result);
        setData(result?.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCategoryWiseProduct();
    }, []);

    const scrollRight = () => {
        // Scroll the div by 300 pixels to the right
        scrollElem.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        // Scroll the div by 300 pixels to the left
        scrollElem.current.scrollLeft -= 300
    }
    return (
        <div className=' container mx-auto px-4 my-5 relative'>
            <h2 className=' font-bold text-xl py-3'>{heading}</h2>


            <div className=' flex items-center gap-5 overflow-scroll scrollbar-none transition-all' ref={scrollElem}>

                <button className=' bg-white shadow-md rounded-full p-2  
                 absolute left-0 text-lg hidden md:block z-10'
                    onClick={scrollLeft}>
                    <ArrowBackIosIcon></ArrowBackIosIcon>
                </button>
                <button className=' bg-white shadow-md rounded-full p-2
                 absolute right-0 text-lg hidden md:block z-10'
                    onClick={scrollRight}>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </button>


                {loading ? (
                    loadingList.map((el, index) => {
                        return (
                            <div className=' w-full min-w-[280px] max-w-[280px] md:max-w-[320px] md:min-w-[320px]  shadow-sm  rounded-md bg-white' key={index}>


                                <div className=' bg-slate-200 min-w-[280px] md:min-w-[145px] h-48 p-2 flex justify-center items-center animate-pulse'>
                                </div>

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
                            <Link to={"product/" + product?._id} className=' w-full min-w-[280px] max-w-[280px] md:max-w-[320px] md:min-w-[320px]  shadow-sm  rounded-md bg-white' key={index}>


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
        </div>
    )
}

export default VerticalCardProduct
