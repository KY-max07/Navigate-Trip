import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PhotoURL } from "@/service/GlobalApi";

const TripPlanCards = ({ places }) => {
  const [photoURi, setPhotoURi] = useState("");

  useEffect(() => {
    const GetInfo = async () => {
      const data = {
        textQuery: places?.name,
      };

      try {
        const res = await GetPlaceDetails(data);

        const name = res?.data?.places?.[0]?.photos?.[5]?.name ||res?.data?.places?.[0]?.photos?.[4]?.name ||res?.data?.places?.[0]?.photos?.[2]?.name;

        if (name) {
          const URL = PhotoURL.replace("{name}", name)
            .replace("{600}", "600")
            .replace("{1600}", "900");
           
            setPhotoURi(URL||"/src/assets/placeholder.jpg");
        } else {
            setPhotoURi("/src/assets/placeholder.jpg")
          console.warn("No photo name found");
        }
      } catch (error) {
        setPhotoURi("/src/assets/placeholder.jpg")
        console.error("Error fetching place details:", error);
        
      }
    };

    if (places) {
      GetInfo();
    } else {
      console.log("Trip not available");
    }
  }, [places]);

  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="w-full">
        <img
          src={photoURi || "/src/assets/placeholder.jpg"}
          alt={places?.name || "Place_image"}
          className="w-full md:w-full rounded object-cover h-40 mr-2"
        />
      </div>
      <div className="md:w-3/3 ">
        <div className="flex justify-between">
          <h1 className="font-secondary text-2xl">{places?.name}</h1>
          <h3 className="font-mono ">⭐{places?.rating}</h3>
        </div>
        <p className="font-primary font-medium text-black/80 mb-2 text-sm">
          {places?.address}
        </p>
        <h2 className="font-primary font-medium text-black/90 text-sm ">
          {places?.details}
        </h2>
        <div className="flex mt-2  items-baseline-last justify-between">
          <h2 className="font-primary font-bold tracking-wide absolute bottom-1 w-9/10 ">
            {places?.ticket_price}
          </h2>
          <NavLink
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              places?.name +
              " " +
              places?.address
            }
            target="_blank"
          >
            <Button className=" absolute bottom-2 right-2 p-2">
              <img src="/src/assets/location1.svg" alt="" className="h-4 w-4 " />
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TripPlanCards;
