import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PhotoURL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const TripHero = ({ trip }) => {
 

const [photoURi, setPhotoURi] = useState('');

useEffect(() => {
  const GetInfo = async () => {
   

    const data = {
      textQuery: trip?.userSelection?.location?.label 
    };
    console.log("Sending data to API:", data);

    try {
      const res = await GetPlaceDetails(data);
      console.log("res=>",res)
      const name = res?.data?.places?.[0]?.photos?.[2]?.name||res?.data?.places?.[0]?.photos?.[4]?.name ||res?.data?.places?.[0]?.photos?.[2]?.name;
      console.log("name=>",name)
      if (name) {
        const URL = PhotoURL.replace('{name}',name)
        .replace('{600}', "600")
        .replace('{1600}', "1600");
       console.log(URL)
        setPhotoURi(URL);
      } else {
        console.warn("No photo name found");
        setPhotoURi("/src/assets/image.png");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  if (trip) {
    GetInfo();
  } else {
    console.log('Trip not available');
  }
}, [trip]); 





  return (
    
    <div>
      <img
        src={photoURi? photoURi:"/src/assets/image.png"}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "/src/assets/image.png"; 
        }}
        alt="placeholder-image"
        className="w-full h-60 object-cover rounded "
      />
      <div className="m-2">
        <h1 className="font-secondary text-3xl md:text-5xl mt-8 ">
          {trip?.userSelection?.location?.label}
        </h1>
        <div className="flex   mt-3 justify-between items-baseline-last">
          <div className="flex flex-col gap-2 md:flex-row">
            <p className="bg-gray-300 rounded-4xl p-2 font-secondary text-gray-800 text-sm">
            🧿 Traveller : {trip?.userSelection?.traveller}
            </p>
            <p className="bg-gray-300 rounded-4xl p-2 font-secondary text-gray-800 text-sm">
            🧿 Total days : {trip?.userSelection?.noofdays}
            </p>
            <p className="bg-gray-300 rounded-4xl p-2 font-secondary text-gray-800 text-sm">
            🧿 Budget : {trip?.userSelection?.budget}
            </p>
          </div>
          <NavLink to={"https://www.google.com/maps/search/?api=1&query="+trip?.userSelection?.location?.label} target="_blank" >
          <Button className="cursor-pointer mx-5 ">
            <img src="/src/assets/location1.svg" alt="" className="h-6 w-6 " />
          </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TripHero;
