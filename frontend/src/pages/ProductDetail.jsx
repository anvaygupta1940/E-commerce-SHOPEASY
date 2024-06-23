import React, { useCallback, useContext, useEffect, useState } from 'react'
import SummaryApi from '../common';
import { useNavigate, useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import displayINRCurrency from "../helpers/displayCurrency";
import RecommendedProductCard from '../components/RecommendedProductCard';
import addToCart from '../helpers/addToCart';
import { Context } from '../context';


const ProductDetail = () => {
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(4).fill(null);
    const [activeImgUrl, setActiveImgUrl] = useState("");  // big box
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    });
    const [openZoomBox, setOpenZoomBox] = useState(false);
    const { fetchUserAddToCart } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState({
        _id: "",
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const params = useParams();
    // console.log("Product id >>", params);


    const fetchProductDetail = async () => {
        setLoading(true);
        const res = await fetch(SummaryApi.getProductDetail.url, {
            method: SummaryApi.getProductDetail.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        });

        const result = await res.json();
        setData(result?.data);
        setActiveImgUrl(result?.data?.productImage[0]);
        setLoading(false);
    }

    // console.log("Product details >>", data);

    useEffect(() => {
        fetchProductDetail();
    }, [params])

    const handleActiveImageUrl = (imageUrl) => {
        setActiveImgUrl(imageUrl);
    }

    const handleZoomImage = useCallback((e) => {
        setOpenZoomBox(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        // console.log("Coordinates >> ", left, top, width, height);

        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomImageCoordinate({
            x,
            y
        });
    }, [zoomImageCoordinate]);

    const handleCloseZoomImageBox = () => {
        setOpenZoomBox(false);
    }



    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    }
    return (
        <div className=' container mx-auto p-4'>

            <div className='  min-h-[250px] flex flex-col lg:flex-row gap-4'>


                {/* product images  */}
                <div className=' h-96 flex flex-col lg:flex-row-reverse gap-4'>

                    <div className='  h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
                        <img src={activeImgUrl} alt='productImages' className=' w-full h-full object-scale-down mix-blend-multiply'
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleCloseZoomImageBox}></img>

                        {/* product zoom   only dekstop version */}
                        {
                            openZoomBox && (
                                <div className=' hidden lg:block absolute overflow-hidden bg-slate-200 min-w-[400px] min-h-[500px] p-1  -right-[510px] top-0 '>
                                    {/* place the image as a background */}
                                    <div className=' w-full h-full mix-blend-multiply min-w-[500px] min-h-[400px] scale-125'
                                        style={{
                                            backgroundImage: `url(${activeImgUrl})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                        }}>
                                    </div>
                                </div>
                            )
                        }


                    </div>


                    <div className=' h-full'>
                        {
                            loading ? (
                                <div className=' flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        loadingList.map((el, index) => {
                                            return (
                                                <div className=' w-20 h-20 bg-slate-200 rounded animate-pulse' key={index}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className=' flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data.productImage.map((imageUrl, index) => {
                                            return (
                                                <div className=' w-20 h-20 bg-slate-200 rounded p-1 cursor-pointer' key={index} onMouseEnter={() => handleActiveImageUrl(imageUrl)} onClick={() => handleActiveImageUrl(imageUrl)}>
                                                    <img src={imageUrl} className=' w-full h-full object-scale-down mix-blend-multiply'></img>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>

                </div>

                {/* product details  */}
                {
                    loading ? (
                        <div className=' grid gap-2 w-full'>
                            <p className='  bg-slate-200 rounded-full animate-pulse h-6 lg:h-8 w-full font-bold'></p>
                            <p className=' text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></p>
                            <p className=' text-slate-500  capitalize bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

                            <div className=' flex items-center gap-1 text-red-600 h-6 lg:h-8 animate-pulse bg-slate-200 w-full'>
                            </div>

                            <div className=' flex items-center gap-2 text-2xl lg:text-4xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                                <p className=' text-red-600 bg-slate-200 w-full'></p>
                                <p className=' text-slate-400 line-through bg-slate-200 w-full'></p>
                            </div>

                            <div className=' flex items-center gap-3 my-2 w-full'>
                                <button className=' h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8'></button>
                                <button className=' h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8'></button>
                            </div>

                            <div className=' w-full'>
                                <p className=' text-slate-600 my-1 font-medium h-6 lg:h-8 bg-slate-200 animate-pulse rounded w-full'></p>
                                <p className=' h-10 lg:h-8 rounded bg-slate-200 animate-pulse w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className=' flex flex-col gap-1'>
                            <p className=' w-fit bg-red-200 rounded-full text-red-600 px-2 font-bold'>{data.brandName}</p>
                            <p className=' text-2xl lg:text-4xl font-medium'>{data.productName}</p>
                            <p className=' text-slate-500  capitalize'>{data.category}</p>

                            <div className=' flex items-center gap-1 text-red-600'>
                                <StarIcon></StarIcon>
                                <StarIcon></StarIcon>
                                <StarIcon></StarIcon>
                                <StarIcon></StarIcon>
                                <StarHalfIcon></StarHalfIcon>
                            </div>

                            <div className=' flex items-center gap-2 text-2xl lg:text-4xl font-medium my-1'>
                                <p className=' text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                                <p className=' text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                            </div>

                            <div className=' flex items-center gap-3 my-2'>
                                <button className=' border-2 border-red-600 text-red-600  font-medium hover:bg-red-600 hover:text-white rounded px-3 py-1 min-w-[100px]'
                                    onClick={(e) => {
                                        handleAddToCart(e, data._id);
                                        navigate("/cart");
                                    }}>Buy</button>
                                <button className=' border-2 border-red-600  rounded px-3 py-1 min-w-[100px] text-white bg-red-600 hover:text-red-600 hover:bg-white font-medium'
                                    onClick={(e) => handleAddToCart(e, data._id)}>Add To Cart</button>
                            </div>

                            <div>
                                <p className=' text-slate-600 my-1 font-medium'>Description :</p>
                                <p>{data.description}</p>
                            </div>
                        </div>
                    )
                }

            </div>


            {
                data?.category && (
                    <RecommendedProductCard heading={"Recommended Product"} category={data?.category}></RecommendedProductCard>
                )
            }

        </div>
    )
}

export default ProductDetail
