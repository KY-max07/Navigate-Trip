
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import MyTripCards from "./MyTripCards";



const MyTrip = () => {
  const navigate = useNavigate;
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  },[]);

  const getTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);
    setTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     
      setTrips((prev) => [...prev, doc.data()]);
    },[]);
  };
  
  return (
    <div className=" ">
      
      
      <div className="container mx-auto  mt-15 p-3 md:p-10  flex flex-col justify-between md:w-full">
        <h2 className="text-3xl md:text-4xl text-side font-secondary mb-3 md:mb-5">
          My-Trips
        </h2>
        {!trips ? (
          <div className="min-h-100 md:min-h-83  flex flex-col gap-1 md:gap-6 items-center justify-center text-center">
            <h2 
            className="  text-red-700 font-secondary text-2xl md:text-3xl ">
              Sorry! You don't have past trips
            </h2>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 min-h-83">
          {trips.length>0?trips.reverse().map((trip, index) => (
            <div key={index}>
              <MyTripCards trip={trip} />
            </div>
          )):
          [1,2,3,4,5,6].map((i,index)=>(
            <div key={index} className="h-60 md:h-90 bg-gray-300 animate-pulse rounded-xl">
                
            </div>
          ))
          }
        </div>
        )}
        
      </div>
      
    </div>
  );
};

export default MyTrip;
