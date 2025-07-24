import React from 'react'
import {Hero} from '../../components/landing/Home/Hero'
import TakesCareWrapper from "../../components/landing/Home/TakesCare"
import FAQS from "../../components/landing/Home/FAQs"

export const HomeComponent = () => {
  return (
    <div>
      <Hero/>
      <div className='w-full flex justify-center items-center '>
      <TakesCareWrapper/>
      </div>
      <FAQS/>
    </div>
  )
}
