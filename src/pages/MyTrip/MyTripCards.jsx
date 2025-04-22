import { GetPlaceDetails, PhotoURL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/image.png";

const MyTripCards = ({ trip }) => {
  const [photoURi, setPhotoURi] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const GetInfo = async () => {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };

      try {
        const res = await GetPlaceDetails(data);
        const name =
          res?.data?.places?.[0]?.photos?.[2]?.name ||
          res?.data?.places?.[0]?.photos?.[4]?.name ||
          res?.data?.places?.[0]?.photos?.[2]?.name;

        if (name) {
          const URL = PhotoURL.replace("{name}", name)
            .replace("{600}", "600")
            .replace("{1600}", "1600");

          setPhotoURi(URL);
        } else {
          console.warn("No photo name found");
        }
      } catch (e) {
        console.log("something went Wrong:", e);
      }
    };

    if (trip) {
      GetInfo();
    } else {
      console.log("Trip not available");
    }
  }, [trip]);

  return (
    <div
      className="md:hover:scale-102 transition-all cursor-pointer  p-1.5"
      onClick={() => navigate(`/view-trip/${trip?.id}`)}
    >
      <img
        src={photoURi}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =  image ;
        }}
        alt={trip?.userSelection?.location?.label}
        className="object-cover rounded-xl h-50 md:h-80 w-full"
        loading="lazy"
      />
      <div>
        <h2 className="text-xl md:text-2xl font-secondary px-1 pt-3">
          {trip?.userSelection?.location?.label}
        </h2>
        <p className="text-sm md:text-md md:font-primary px-1">
          A {trip?.userSelection?.noofdays}-day trip for{" "}
          {trip?.userSelection?.traveller} on a {trip?.userSelection?.budget}{" "}
          budget.
        </p>
      </div>
    </div>
  );
};

export default MyTripCards;
