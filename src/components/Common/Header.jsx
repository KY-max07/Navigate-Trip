import React, { useEffect, useState } from "react";
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
  const picture = user?.picture;
  useEffect(() => {
    console.log(picture);
  });
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
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
      });
  };

  return (
    <div className="container sticky top-2  w-11/12 mx-auto md:w-full pl-2 pr-3 md:pl-10 md:pr-13 text-gray-100 flex items-center justify-between h-15  rounded-3xl bg-black/25 backdrop-blur-md  mt-2 z-50">
      <img
        src="/src/assets/Navigate-trip-light.svg"
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

            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture||"/src/assets/profile.jpg" }
                  alt=""
                  className="h-10 w-10 rounded-full mr-0 ml-5 object-cover cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-black/50 text-gray-900 font-secondary text-center text-2xl backdrop-blur-lg relative top-2 right-4 cursor-pointer hover:text-black/60">
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
                >
                  Logout
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
            <DialogTitle className="flex justify-between">
              <img
                src="/src/assets/navigate-Trip-light.svg"
                alt="Navigate-Trip"
                className="h-7"
              />
              <button
                onClick={() => setOpenDialog(false)}
                className="relative bottom-3 left-1 bg-white hover:border-2 hover:border-black/40 h-5 w-5 z-50 font-primary rounded"
              >
                x
              </button>
            </DialogTitle>
            <DialogDescription>
              <h1 className="text-2xl md:text-3xl  text-black font-secondary text-start mt-3">
                Sign In with Google
              </h1>
              <p className="text-start text-xs md:text-lg md:font-primary md:text-gray-800">
                {" "}
                Sign in to the App with Google authentication securely{" "}
              </p>

              <Button onClick={login} className="w-full mt-5">
                <img src="/src/assets/google.svg" alt="" className="h-4" />
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
