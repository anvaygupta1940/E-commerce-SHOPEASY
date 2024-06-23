import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';


const AllProducts = () => {
    const [openUploadProductBox, setOpenUploadProductBox] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const fetchAllProducts = async () => {
        const res = await fetch(SummaryApi.allProduct.url, {
            method: SummaryApi.allProduct.method,
            credentials: "include"
        });

        const result = await res.json();

        // console.log("Fetched all products data >>", result);
        if (result?.data) {
            setAllProducts(result.data);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);


    return (
        <div>
            <div className=' bg-white py-2 px-4 flex justify-between items-center'>
                <h1 className=' font-semibold text-lg'>All Product</h1>
                <button className=' border-2 border-red-600 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-700 hover:text-white'
                    onClick={() => setOpenUploadProductBox(true)}>Upload Product</button>
            </div>

            {/* rendering all products */}
            <div className=' flex flex-wrap item-center py-4 gap-4 h-[calc(100vh-190px)] overflow-y-scroll '>
                {
                    allProducts.map((product, index) => {
                        return (
                            <AdminProductCard product={product} key={index} callFunc={fetchAllProducts}></AdminProductCard>
                        )
                    })
                }
            </div>


            {/* // upload product component */}
            {
                openUploadProductBox && (
                    <UploadProduct onClose={() => setOpenUploadProductBox(false)} callFunc={fetchAllProducts}></UploadProduct>
                )
            }
        </div>
    )
}

export default AllProducts
