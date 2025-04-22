import React, { useState } from "react";
import profile from "../../assets/profile.jpg"
import nav from '../../assets/navigate-Trip-light.svg'
import google from "../../assets/google.svg"
import logo from '../../assets/Navigate-trip-logo.svg'
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  
  const login = useGoogleLogin({
    onSuccess: (v) => getUserProfile(v),
    onError: (k) => console.log(k),
  });
  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
      });
  };

  return (
    <div className="container sticky top-2  w-11/12 mx-auto md:w-full pl-2 pr-3 md:pl-10 md:pr-13 text-gray-100 flex items-center justify-between h-15  rounded-3xl bg-black/25 backdrop-blur-md  mt-2 z-50">
      <img
        src={nav}
        alt="Navigate-Trip"
        className="h-8 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div>
        {user ? (
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => {
                navigate("/my-trip");
              }}
              variant="outline"
              className="text-black text-2xl font-secondary rounded-full bg-black/10 hidden md:flex cursor-pointer"
            >
              My-trips
            </Button>
            <Button
              onClick={() => {
                navigate("/create-trip");
              }}
              variant="outline"
              className="text-black text-2xl font-secondary rounded-full bg-black/10 hidden   md:flex cursor-pointer"
            >
              create-trip
            </Button>

            <Popover >
              <PopoverTrigger>
                <img
                src={user.picture}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = {profile}; 
                }}
                  // src={user.picture || "/src/assets/profile.jpg"}
                  alt="profile"
                  className="h-10 w-10 rounded-full mr-0 ml-5 object-cover cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-black/50 text-white font-secondary text-center text-2xl backdrop-blur-lg relative top-2 right-4  flex flex-col gap-3 transition-all">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();

                    navigate("/", { replace: true });

                    // Disable back navigation
                    window.history.pushState(null, "", window.location.href);
                    window.onpopstate = () => {
                      navigate("/", { replace: true });
                    };
                  }}
                  className="hover:bg-gray-900 rounded p-2 cursor-pointer"
                >
                  Logout
                </h2>
                <h2 className="hover:bg-gray-900 rounded p-2 cursor-pointer md:hidden" 
                onClick={() => {
                  setOpenDialog(false)
                navigate("/create-trip");
                
              }}
              >
                  Create-Trip
                </h2>
                <h2 className="hover:bg-gray-900 rounded p-2 cursor-pointer md:hidden" onClick={() => {
                  
                navigate("/my-trip");
                
              }}>
                  View-Trip
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className=" font-primary text-md md:text-2xl font-medium cursor-pointer tracking-wider"
          >
            Sign in
          </Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-end">
             
              <button
                onClick={() => setOpenDialog(false)}
                className="relative bottom-3 left-2 bg-white hover:border-2 hover:border-black/40 h-5 w-5 z-50 font-primary rounded"
              >
                x
              </button>
            </DialogTitle>
            <DialogDescription>
              <h1 className="text-2xl md:text-3xl  text-black font-secondary text-start flex gap-2 items-center  relative top-[-25px]">
              <img
                src={logo}
                alt="Navigate-Trip"
                className="h-6"
              />Sign In with Google
              </h1>
              <p className="text-start text-xs md:text-lg md:font-primary md:text-gray-800 relative top-[-20px]">
                {" "}
                Sign in to the App with Google authentication securely{" "}
              </p>

              <Button onClick={login} className="w-full mt-5 cursor-pointer relative top-[-10px]">
                <img src={google} alt="" className="h-4" />
                Login with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
