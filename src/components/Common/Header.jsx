import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="container sticky top-2  w-11/12 mx-auto md:w-full pl-2 pr-3 md:pl-10 md:pr-13 text-gray-100 flex items-center justify-between h-15  rounded-3xl bg-black/25 backdrop-blur-md  mt-2 z-50">
      <img
        src="/src/assets/Navigate-trip-light.svg"
        alt="Navigate-Trip"
        className="h-8 "
      />
      <Button className=" font-primary text-md md:text-2xl font-medium cursor-pointer tracking-wider">
        Sign in
      </Button>
      
    </div>
  );
};

export default Header;
