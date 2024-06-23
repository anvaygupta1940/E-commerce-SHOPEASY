import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from "../helpers/productCategory";
import CategoryProductCard from '../components/CategoryProductCard';
import SearchCardProduct from '../components/SearchCardProduct';
import SummaryApi from '../common';


const CategoryProduct = () => {
    const navigate = useNavigate();
    // console.log("category", params?.categoryName);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState("");


    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    //  mark all the category coming the url true
    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    // console.log("url category list in array >>", urlCategoryListinArray);
    // console.log("url category list object >>", urlCategoryListObject);


    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);


    const fetchData = async () => {
        const res = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });

        const result = await res.json();

        setData(result?.data || []);
        // console.log("Data >>", result);
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target;

        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }

    // console.log("Select category>>", selectCategory);

    // run when selectCategory changes
    useEffect(() => {
        // extracting key from select Category object
        // const arrayOfCategory = Object.keys(selectCategory).map(categoryName => {
        //     // console.log(categoryName);
        // });

        // extracting only those key which are true from select Category object
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName;
            }

            return null;
        }).filter(el => el);
        // console.log("Array of category >>", arrayOfCategory)

        setFilterCategoryList(arrayOfCategory);

        // format for url change when change on the checkbox
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }

            return `category=${el}&&`
        })
        // console.log("url format >>", urlFormat.join(""));
        navigate("/product-category?" + urlFormat.join(""));


    }, [selectCategory]);



    //  runs when filter category list changes
    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);


    const handleOnChangeSortBy = (e) => {
        const { value } = e.target
        setSortBy(value);
        if (value === "asc") {
            setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
        }
        if (value === "desc") {
            setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    }
    return (
        <div className=' container mx-auto p-4'>

            {/* desktop version -> hiddent in mobile version */}
            <div className=' hidden lg:grid grid-cols-[200px,1fr]'>

                {/* left side (filter) */}
                <div className=' min-h-[calc(100vh-120px)] bg-white p-2 overflow-y-scroll'>

                    {/* sort by price  */}
                    <div>
                        <h3 className=' uppercase text-slate-500 font-medium text-lg pb-1 border-b border-slate-300'>Sort By</h3>

                        <form className=' text-sm flex flex-col gap-2 py-2'>

                            {/* both the input container have same name so that only one is selected at a time */}
                            <div className=' flex items-center gap-3'>
                                <input type='radio' name='sortBy' value={'asc'} onChange={handleOnChangeSortBy} checked={sortBy === "asc"}></input>
                                <label>Price - Low to High</label>
                            </div>
                            <div className=' flex items-center gap-3'>
                                <input type='radio' name='sortBy' value={'desc'} onChange={handleOnChangeSortBy} checked={sortBy === "desc"}></input>
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>


                    {/* sort by category */}
                    <div>
                        <h3 className=' uppercase text-slate-500 font-medium text-lg pb-1 border-b border-slate-300'>Category</h3>

                        <form className=' text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div className=' flex items-center gap-3'>
                                            <input type='checkbox' name={'category'} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} checked={selectCategory[categoryName?.value]}></input>
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>



                </div>

                {/* right side (product) */}
                <div className=' px-4'>
                    <p className=' font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
                    <div className=' h-[calc(100vh-120px)] overflow-y-scroll'>
                        {
                            data.length !== 0 && (
                                <SearchCardProduct data={data} loading={loading}></SearchCardProduct>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
