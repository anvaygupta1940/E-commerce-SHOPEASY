import SummaryApi from "../common";
import { toast } from "react-toastify";


const addToCart = async (e, id) => {
    e?.preventDefault();
    e?.stopPropagation();

    const res = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            productId: id
        })
    });

    const result = await res.json();

    // console.log("AddtoCart result >>>", result);
    if (result.success) {
        toast.success(result?.message);
    }
    if (result.error) {
        toast.error(result?.message);
    }
}

export default addToCart;