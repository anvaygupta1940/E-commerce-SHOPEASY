import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment from "moment";
import displayINRCurrency from '../helpers/displayCurrency';



const Order = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {

        const res = await fetch(SummaryApi.order.url, {
            method: SummaryApi.order.method,
            credentials: "include"
        });

        const result = await res.json();
        // console.log("order list>>", result);
        setData(result?.data);
    }

    useEffect(() => {
        fetchOrderDetails();
    }, []);
    return (
        <div>
            {/* no product in cart container */}
            {
                data.length === 0 && (
                    <div className=' bg-white w-full py-5 rounded font-semibold text-center my-2'>No Order</div>
                )
            }

            <div className=' p-3'>
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className=' mb-4'>
                                <p className=' text-lg font-bold'>{moment(item.createdAt).format('LL')}</p>

                                <div className='border'>
                                    <div className=' flex flex-col lg:flex-row justify-between'>
                                        <div className=' grid gap-2'>
                                            {
                                                item.productDetails.map((product, ind) => {
                                                    return (
                                                        // each product detail
                                                        <div className=' flex gap-4 bg-slate-100' key={ind}>
                                                            <img
                                                                src={product?.image[0]}
                                                                className=' w-28 h-28 p-2 bg-slate-200 object-scale-down'>
                                                            </img>
                                                            <div>
                                                                <p className=' font-bold text-ellipsis line-clamp-1'>{product?.name}</p>
                                                                <div className=' flex items-center gap-5'>
                                                                    <p className=' text-red-500 font-bold'>{displayINRCurrency(product.price)}</p>
                                                                    <p className=' font-medium'>Quantity : {product?.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className=' p-2 min-w-[300px]  flex flex-col gap-3'>
                                            <div>
                                                <p className=' font-bold'>Payment Details :</p>
                                                <p className=' ml-1'>Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                                                <p className=' ml-1'>Payment status : {item.paymentDetails.payment_status}</p>
                                            </div>
                                            <div>
                                                <p className=' font-bold'>Shipping Details :</p>
                                                {
                                                    item.shipping_options.map((shipping, ind) => {
                                                        return (
                                                            <div className=' ml-1'>Shipping Amount : {shipping.shipping_amount}</div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' font-bold lg:text-lg w-fit ml-auto'>
                                        Total Amount : {item.totalAmount}
                                    </div>
                                </div>


                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Order
