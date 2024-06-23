import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Address from "../pages/Address";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Order from "../pages/Order";
import AllOrders from "../pages/AllOrders";


const router = createBrowserRouter([
    {
        path: '/',              // base url
        element: <App></App>,   // base component
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "sign-up",
                element: <SignUp></SignUp>
            },
            {
                path: "product-category",
                element: <CategoryProduct></CategoryProduct>
            },
            {
                path: "product/:id",
                element: <ProductDetail></ProductDetail>
            },
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: "success",
                element: <Success></Success>
            },
            {
                path: "cancel",
                element: <Cancel></Cancel>
            },
            {
                path: "order",
                element: <Order></Order>
            },
            {
                path: "search",
                element: <SearchProduct></SearchProduct>
            },
            {
                path: "address",
                element: <Address></Address>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "admin-panel",
                element: <AdminPanel></AdminPanel>,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers></AllUsers>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts></AllProducts>
                    },
                    {
                        path: "all-orders",
                        element: <AllOrders></AllOrders>
                    }
                ]
            }
        ]
    }
])


export default router;
