import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import ScrollToTop from "@/components/ScrollToTop";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Lenis from 'lenis'

const UserLayout = () => {
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      lerp:0.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smooth: true, 
    });

    
    const raf = (time) => {
      lenis.raf(time); 
      requestAnimationFrame(raf);  
    };

    // Start the animation loop
    requestAnimationFrame(raf);

    
    return () => {
      lenis.destroy();
    };
  }, []);





  return (
    <div>
      {/* <div className="fixed bg-home h-2 w-full  top-0 z-49"></div> */}
      {/* <ScrollToTop/> */}
      <Header />
      <ScrollToTop/>
      <Outlet />
      <Footer/>
      <Toaster />
    </div>
  );
};

export default UserLayout;
