import { GetPlaceDetails, PhotoURL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";





const HotelCards = ({ hotel }) => {
const [photoURi, setPhotoURi] = useState('');

useEffect(() => {
  const GetInfo = async () => {
    const data = {
      textQuery: hotel?.name
    };
    console.log("Sending data to API:", data);

    try {
      const res = await GetPlaceDetails(data);
      const name = res?.data?.places?.[0]?.photos?.[3]?.name||res?.data?.places?.[0]?.photos?.[4]?.name ||res?.data?.places?.[0]?.photos?.[2]?.name;

      if (name) {
        const URL =  PhotoURL.replace('{name}',name)
        .replace('{600}', "600")
        .replace('{1600}', "400");
        setPhotoURi(URL);
      } else {
        console.warn("No photo name found");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  if (hotel) {
    GetInfo();
  } else {
    console.log('Trip not available');
  }
}, [hotel]); 




  return (
    <NavLink
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.name +
        " " +
        hotel?.address
      }
      target="_blank"
    >
      <img
        src={photoURi? photoURi:"/src/assets/image.png"}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "/src/assets/image.png"; 
        }}
        alt={hotel?.name}
        className="w-full h-40 object-cover rounded"
        loading="lazy" 
      />

      <div className="flex justify-between ">
        <h1 className="mt-2  font-secondary text-xl">{hotel?.name}</h1>
        <h1 className="mt-2 text-center text-sm font-mono">
          ⭐{hotel?.rating}
        </h1>
      </div>
      <p className="font-primary font-medium text-black/80 pb-8 text-sm">
        {" "}
        {hotel?.address}
      </p>

      <p className="font-primary text-side tracking-wide font-bold  absolute bottom-2">
        {hotel?.price}
      </p>
    </NavLink>
  );
};

export default HotelCards;
