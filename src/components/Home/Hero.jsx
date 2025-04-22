import React from 'react'
import { Button } from '../ui/button'
// import Spline from "@splinetool/react-spline";
import { NavLink } from 'react-router-dom'
import logo from '../../assets/Navigate-trip-logo.svg'

const Hero = () => {
  return (
    <div className='container mx-auto text-black flex flex-col items-center justify-center mt-40  text-center w-11/12 md:w-4/5'>
        <h1 className='text-3xl md:text-6xl text-side font-secondary'>Discover Your Next Adventure with AI:  </h1>
        <h1 className='text-2xl md:text-6xl md:mt-3 font-secondary'>Personalized Itineraries at Your FingerTips!</h1>
        <p className='text-sm  md:text-2xl  mt-6 md:mt-10 mb-3 md:mb-3 text-center text-gray-700 md:text-gray-500 md:font-primary font-bold md:m-3 md:tracking-wide'>Your personalized trip planner and travel curator, creating ititnereries tailored to your interests and budgets.</p>
        <NavLink to="/create-trip">
        <Button className="text-md font-primary font-medium tracking-wider py-6 cursor-pointer">Get Started---It's Free⚡</Button>
        </NavLink>
        <img src={logo} alt="logo" className='m-30 md:m-40 relative md:left-10' />
        {/* <Spline scene="https://prod.spline.design/fPwkp5jMlM8-UaAI/scene.splinecode" /> */}
    </div>
  )
}
  
export default Hero