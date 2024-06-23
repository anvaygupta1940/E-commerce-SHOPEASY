import React, { useEffect, useState } from 'react'
import SummaryApi from "../common/index";
import { Link } from 'react-router-dom';


const CategoryProductList = () => {
    const [categoryProductList, setCategoryProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(12).fill(null);


    const fetchCategoryProductList = async () => {
        setLoading(true);
        const res = await fetch(SummaryApi.getCategoryProduct.url, {
            method: SummaryApi.getCategoryProduct.method,
            credentials: "include"
        });

        const result = await res.json();
        // console.log("Category product List >>", result);
        setCategoryProductList(result.data);
        setLoading(false);

    }

    useEffect(() => {
        fetchCategoryProductList();
    }, []);

    return (
        <div className=' px-4 py-2 container mx-auto  '>
            <div className=' flex gap-2 items-center justify-between overflow-scroll scrollbar-none'>
                {

                    loading ? (

                        categoryLoading?.map((el, index) => {
                            return (
                                <div className=' h-16 w-16 md:w-20 md:h-20 rounded-full bg-white overflow-hidden animate-pulse transition-all' key={index}></div>
                            )
                        })
                    ) :
                        (
                            categoryProductList.map((product, index) => {
                                return (
                                    <Link to={"/product-category?category=" + product?.category} className=' cursor-pointer' key={index}>
                                        <div className=' h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full  p-4 flex items-center justify-center bg-slate-200'>
                                            <img src={product?.productImage[0]} alt='productImage' className=' h-full w-full mix-blend-multiply object-scale-down hover:scale-125 transition-all'></img>
                                        </div>
                                        <p className=' px-2 capitalize text-xs md:text-base text-ellipsis line-clamp-1 mr-auto'>{product?.category}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default CategoryProductList
