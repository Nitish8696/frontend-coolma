import React from 'react'
import BestSelling from "./BestSelling.jsx"
import SkinCare from "./SkinCare.jsx"
import Custumer from "./Custumer.jsx"
import Header from "./Header.jsx"
import Therapy from './Therapy.jsx'
import Timer from './Timer.jsx'
import Arrival from './Arrival.jsx'
import MobileCategory from './MobileCategory.jsx'
const Home = () => {
  return (
    <div className='pt-5'>
      <div className=' sm:hidden'>
        <MobileCategory />
      </div>
      <BestSelling />
      <SkinCare />
      <Therapy />
      <Arrival />
      <Custumer />
      <Header />
    </div>
  )
}

export default Home
