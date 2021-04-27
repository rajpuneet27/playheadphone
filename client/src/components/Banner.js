import React from 'react';
import wirelessBanner from "../Images/wireless-banner.jpg"
import ItemCard from './ItemCard';

function Banner() {
    return (
        <>
        <img className="banner-image" src={wirelessBanner} alt="Banner"/>
        <ItemCard />
        </>
    )
}

export default Banner
