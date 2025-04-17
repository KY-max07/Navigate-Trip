import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import ScrollToTop from "@/components/ScrolltoTop";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Lenis from 'lenis'

const UserLayout = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      lerp:0.5, // Transition speed (higher value makes it slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smooth: true, // Smooth scroll enabled
    });

    // Function to handle Lenis' RAF (requestAnimationFrame) loop
    const raf = (time) => {
      lenis.raf(time);  // Render the animation frame
      requestAnimationFrame(raf);  // Keep the animation loop going
    };

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup function to destroy Lenis instance when the component unmounts
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
