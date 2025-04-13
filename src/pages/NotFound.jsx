import React from "react";
import Spline from "@splinetool/react-spline";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="md:hidden bg-black w-full h-full overflow-hidden relative">
      <Spline scene="https://prod.spline.design/T2MMdeYwnHxb9xBT/scene.splinecode" />
      <div className="absolute text-white bottom-5   text-center w-full bg-black h-30 font-secondary p-2 ">
      <h1 className="mb-6 pt-2">404 - Page Not Found</h1>
      <NavLink
          to="/"
          className=" bg-white/20 backdrop-blur-2xl text-black h-15 p-4 rounded font-secondary uppercase hover:bg-white/30 text-center "
        >
          Go To Home
        </NavLink>
      </div>
      
      </div>
      <div className="relative hidden 2xl:block h-fit w-full">
      <Spline scene="https://prod.spline.design/Hq9TinwTIzWTD0Ri/scene.splinecode" />
      <p className="bg-black h-9"></p>
      <div className="absolute top-2/5 left-1/3 text-center">
        <h1 className="text-7xl text-white font-secondary  mb-10 ">
          404 - Not Found{" "}
        </h1>
        <NavLink
          to="/"
          className=" bg-white/20 backdrop-blur-2xl text-black h-15 p-4 rounded font-secondary uppercase hover:bg-white/30"
        >
          Go To Home
        </NavLink>
      </div>
      <h1 className="absolute bottom-14 right-5 bg-black text-white p-4 rounded font-secondary tracking-wide ">
        Hover on Screen
      </h1>
    </div>
    </div>
  );
};

export default NotFound;
