import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import ScrollToTop from "@/components/ScrolltoTop";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const UserLayout = () => {
  return (
    <div>
      {/* <div className="fixed bg-home h-2 w-full  top-0 z-49"></div> */}
      {/* <ScrollToTop/> */}
      <Header />
      <Outlet />
      <Footer/>
      <Toaster />
    </div>
  );
};

export default UserLayout;
