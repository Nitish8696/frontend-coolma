import React from 'react'
import BestSelling from "./BestSelling.jsx"
import SkinCare from "./SkinCare.jsx"
import Custumer from "./Custumer.jsx"
import Header from "./Header.jsx"
import Therapy from './Therapy.jsx'
import Alert from './Alert.jsx'
import Timer from './Timer.jsx'
import Arrival from './Arrival.jsx'
const Home = () => {
  return (
    <div className='pt-5'>
      <BestSelling/>     
   <SkinCare/> 
   <Therapy/>
   <Arrival/>
   <Custumer/>
   <Header/>
   <Alert/>
    </div>
  )
}

export default Home
