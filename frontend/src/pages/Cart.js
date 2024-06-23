import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Context } from '../context';
import displayINRCurrency from "../helpers/displayCurrency";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';



const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingList = new Array(context.cartProductCount).fill(null);
    const navigate = useNavigate();


    const fetchCartData = async () => {
        setLoading(true);
        const res = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        });

        const result = await res.json();
        // console.log("Cart data >>", result);


        if (result.success) {
            setData(result?.data);
        }
        setLoading(false);
    }

    const increaseQty = async (id, qty) => {
        const res = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                quantity: qty + 1,
                _id: id
            })
        });

        const result = await res.json();

        if (result.success) {
            fetchCartData();
            context.fetchUserAddToCart();

        }
    }
    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const res = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    quantity: qty - 1,
                    _id: id
                })
            });

            const result = await res.json();

            if (result.success) {
                fetchCartData();
                context.fetchUserAddToCart();
            }
        }
    }
    const handleDeleteProduct = async (id) => {
        const res = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        });

        const result = await res.json();

        // console.log("delete product >>>", result);

        if (result.success) {
            fetchCartData();
            context.fetchUserAddToCart();
        }
    }

    const handlePayment = async () => {

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const res = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                cartItems: data
            })
        });


        const result = await res.json();
        // console.log("Payment response >>", result);

        if (result?.id) {
            stripePromise.redirectToCheckout({ sessionId: result?.id })
        }

    }


    // calculating total quantity of the cart product
    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    // calculating total price of products in cart
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);


    useEffect(() => {
        fetchCartData();
    }, []);


    // const handlePaymentClick = () => {
    //     if (data.length !== 0 && !loading) {
    //         navigate("/address");
    //     }
    // }
    return (
        <div className=' container mx-auto px-10 py-4'>

            {/* no product in cart container */}
            <div className=' text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className=' bg-white py-5 rounded font-semibold'>No Product in Cart</p>
                    )
                }
            </div>

            {/* total product and summary  */}
            <div className=' flex flex-col lg:flex-row lg:justify-between gap-10'>

                {/* view product  */}
                <div className=' max-w-3xl w-full'>

                    {
                        loading ? (
                            loadingList.map((el, ind) => {
                                return (
                                    <div className=' bg-slate-200 w-full h-32 rounded animate-pulse my-2 border-2 border-slate-300' key={ind}>

                                    </div>
                                )
                            })
                        ) : (
                            data.map((product, ind) => {
                                return (
                                    <div className=' bg-white w-full h-32 rounded  my-2 border-2 border-slate-300 grid grid-cols-[128px,1fr] overflow-hidden relative' key={ind}>

                                        {/* delete product icon */}
                                        <div className=' absolute right-0 mr-2 p-2 hover:bg-red-600 hover:text-white rounded-full cursor-pointer text-red-600'
                                            onClick={() => handleDeleteProduct(product?._id)}>
                                            <DeleteIcon></DeleteIcon>
                                        </div>

                                        <div className=' h-32 w-28 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className=' w-full h-full mix-blend-multiply object-scale-down'></img>
                                        </div>

                                        <div className=' py-2'>
                                            <h2 className=' text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className=' capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className=' flex justify-between items-center'>
                                                <p className=' text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className=' text-slate-600 font-semibold text-lg mr-4'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className=' flex items-center gap-3 mt-1'>
                                                <button className=' h-6 w-6 border-red-500 text-red-500 border-2 rounded flex items-center justify-center hover:bg-red-500 hover:text-white'
                                                    onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className=' h-6 w-6 border-red-500 text-red-500 border-2 rounded flex items-center justify-center hover:bg-red-500 hover:text-white'
                                                    onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/* summary container */}
                {
                    data.length !== 0 && (
                        <div className=' mt-5 lg:mt-0 max-w-sm w-full'>
                            {
                                loading ? (
                                    <div className=' bg-slate-200 h-36 rounded border-2 border-slate-300 animate-pulse'>

                                    </div>
                                ) : (
                                    <div className=' bg-white h-36 rounded border-2 border-slate-300'>
                                        <h2 className=' bg-red-500 text-white text-center py-2 font-medium text-lg'>Summary</h2>
                                        <div className=' flex items-center justify-between px-4 font-medium text-lg text-slate-600'>
                                            <p>Quantity</p>
                                            <p>{totalQty}</p>
                                        </div>
                                        <div className=' flex items-center justify-between px-4 font-medium text-slate-600 text-lg'>
                                            <p>Total Price</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>
                                        <button className=' bg-blue-600 text-white text-center w-full p-2 text-lg font-semibold' onClick={handlePayment}>Payment</button>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart
