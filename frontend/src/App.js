import React, { useEffect, useState } from 'react'
import "./App.css";
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from "./common/index";
import { Context } from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/userSlice';


const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);


  // this function is called when user logged in 
  const fetchUserDetails = async () => {
    const res = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"  // because of this we are able to send cookie from frontend to backend
    });

    const result = await res.json();
    // console.log("User Deatils >>", result);
    if (result.success) {
      dispatch(setUserDetails(result.data));
    }

  }

  const fetchUserAddToCart = async () => {
    const res = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include"
    });

    const result = await res.json();

    // console.log("Cart product count >>", result);
    setCartProductCount(result?.data?.count);


  }
  useEffect(() => {
    // user details
    fetchUserDetails();
    // user cart product count
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,  // fetches user details
          cartProductCount, // count number of product in cart of curent user
          fetchUserAddToCart // count the number of product in cart anytime we add product in cart
        }}>
        <ToastContainer
          position='top-center'
        />
        <Header></Header>
        {/* it will display all the pages created inside routes folder */}
        <main className=' pt-16'>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </Context.Provider>
    </>
  )
}

// Created by anvay gupta 

export default App
