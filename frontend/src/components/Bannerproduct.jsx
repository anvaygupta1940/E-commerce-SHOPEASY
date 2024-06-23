import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// deskstop banner images
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

// mobile banner images
import image1Mobile from "../assest/banner/img1_mobile.jpg"
import image2Mobile from "../assest/banner/img2_mobile.webp"
import image3Mobile from "../assest/banner/img3_mobile.jpg"
import image4Mobile from "../assest/banner/img4_mobile.jpg"
import image5Mobile from "../assest/banner/img5_mobile.png"



const Bannerproduct = () => {
    const [currImage, setCurrImage] = useState(0);


    // desktop images array
    const deskstopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    // mobile images array
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ];

    const nextImage = () => {
        if (deskstopImages.length - 1 > currImage) {
            setCurrImage(prev => prev + 1);
        }

    }

    const prevImage = () => {
        if (currImage !== 0) {
            setCurrImage(prev => prev - 1);
        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (deskstopImages.length - 1 > currImage) {
                setCurrImage(prev => prev + 1);
            } else {
                setCurrImage(0);
            }
        }, 5000);

        return () => clearTimeout(interval);
    }, [currImage]);


    return (
        <div className=' container mx-auto px-4 py-2 '>
            <div className=' bg-slate-200 w-full h-72 md:h-[23rem] object-cover rounded relative '>


                <div className=' absolute md:flex items-center  z-10 w-full h-full hidden'>
                    <div className=' flex justify-between w-full  text-2xl'>
                        <button onClick={prevImage} className=' bg-white shadow-md rounded-full p-2 flex items-center justify-center'>
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                        </button>
                        <button onClick={nextImage} className=' bg-white shadow-md rounded-full p-1 flex items-center justify-center'>
                            <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        </button>
                    </div>
                </div>


                {/* deskstop images */}
                <div className='hidden h-full w-full md:flex overflow-hidden'>
                    {
                        deskstopImages.map((item, index) => {
                            return (
                                <div className=' w-full min-h-full min-w-full transition-all' key={index}
                                    style={{ transform: `translateX(-${currImage * 100}%)` }}>
                                    <img src={item} className=' w-full h-full' alt='banner'></img>
                                </div>
                            )
                        })
                    }
                </div>


                {/* mobile images */}
                <div className=' h-full w-full flex overflow-hidden md:hidden'>
                    {
                        mobileImages.map((item, index) => {
                            return (
                                <div className=' w-full h-full min-h-full min-w-full transition-all' key={index}
                                    style={{ transform: `translateX(-${currImage * 100}%)` }}>
                                    <img src={item} className=' w-full h-full object-cover' alt='banner'></img>
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default Bannerproduct
