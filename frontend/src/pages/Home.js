import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpod's"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Smart Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Trending SmartPhone's"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera's & Photography"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"earphones"} heading={"Earphone's & Headphone's"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"refridgerator"} heading={"Refrigerator's"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmer's"}/>

    </div>
  )
}

export default Home
