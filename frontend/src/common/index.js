/* collections of all api urls */
const backendDomain = process.env.REACT_APP_BACKEND_URL

// const backendDomain = "http://localhost:8000"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/logout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/all-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    getCategoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    getProductDetail: {
        url: `${backendDomain}/api/product-detail`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addToCart`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
    payment: {
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    order: {
        url: `${backendDomain}/api/order-list`,
        method: "get"
    },
    allOrder: {
        url: `${backendDomain}/api/all-orders`,
        method: 'get'
    }
}


export default SummaryApi;