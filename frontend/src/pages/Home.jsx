import React from 'react'
import CategoryProductList from '../components/CategoryProductList'
import Bannerproduct from '../components/Bannerproduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCarProduct'

const Home = () => {
    return (
        <div>
            <CategoryProductList></CategoryProductList>
            <Bannerproduct></Bannerproduct>
            <HorizontalCardProduct heading={"Top's Airpodes "} category={"airpodes"}></HorizontalCardProduct>
            <HorizontalCardProduct heading={"Popular's Watches "} category={"watches"}></HorizontalCardProduct>
            <VerticalCardProduct heading={"Mobiles"} category={"mobiles"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Mouse"} category={"mouse"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Televisions"} category={"televisions"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Camera & Photography"} category={"camera"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Wired Earphones"} category={"earphones"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Bluetooth Speakers"} category={"speakers"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Refrigerator"} category={"refrigerator"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Trimmers"} category={"trimmers"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Printers"} category={"printers"}></VerticalCardProduct>
            <VerticalCardProduct heading={"Processors"} category={"processors"}></VerticalCardProduct>
        </div>
    )
}

export default Home
