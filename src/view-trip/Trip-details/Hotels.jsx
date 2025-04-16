import React from "react";

import HotelCards from "./HotelCards";

const Hotels = ({ trip }) => {
  return (
    <div className="border-t-1 border-black/30 md:mx-6">
      <h1 className="my-6 font-secondary text-3xl mx-2">Recommanded Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <div
            key={index}
            className="p-2 border rounded-md shadow hover:scale-105 transition-all cursor-pointer relative bg-gray-900/20 md:bg-gray-200 pb-8"
          >
            <HotelCards hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
