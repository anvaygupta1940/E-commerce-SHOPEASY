import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import SummaryApi from '../common';
import SearchCardProduct from '../components/SearchCardProduct';


const SearchProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = useLocation();
    // console.log("Params frontend >>", query);

    // fetching search results
    const fetchProduct = async () => {
        setLoading(true);
        const res = await fetch(SummaryApi.searchProduct.url + query.search, {
            method: SummaryApi.searchProduct.method
        });

        const result = await res.json();
        // console.log("Result of search >>", result);
        setLoading(false);
        setData(result?.data);
    }

    useEffect(() => {
        fetchProduct();
    }, [query]);


    return (
        <div className=' container mx-auto p-4'>
            {
                loading && (
                    <p className=' text-center text-lg bg-white font-medium p-1 animate-pulse'>Loading ...</p>
                )
            }

            <p className=' font-medium text-lg my-3'>Search Results : {data.length}</p>

            {
                data.length === 0 && !loading && (
                    <p className=' text-center text-lg bg-white font-medium p-1 mt-1 animate-pulse'>No Data Found ...</p>
                )
            }

            {
                data.length !== 0 && !loading && (

                    <SearchCardProduct data={data} loading={loading}></SearchCardProduct>

                )
            }
        </div>
    )
}

export default SearchProduct
