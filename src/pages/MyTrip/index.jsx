import Header from "@/components/Common/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import MyTripCards from "./MyTripCards";
import { Button } from "@/components/ui/button";


const MyTrip = () => {
  const navigate = useNavigate;
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
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
      console.log(doc.id, " => ", doc.data());
      setTrips((prev) => [...prev, doc.data()]);
    });
  };
  console.log(trips);
  return (
    <div className=" ">
      
      
      <div className="container mt-15 p-10 md:mx-auto flex flex-col justify-between md:w-11/12 ">
        <h2 className="text-3xl md:text-4xl text-side font-secondary mb-2 md:mb-5">
          My-Trips
        </h2>
        {!trips ? (
          <div className="min-h-100 md:min-h-83  flex flex-col gap-2 md:gap-6 items-center justify-center text-center">
            <h2 
            className="  text-red-700 font-secondary text-2xl md:text-3xl ">
              Sorry! You don't have past trips
            </h2>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 min-h-83">
          {trips.reverse().map((trip, index) => (
            <div key={index}>
              <MyTripCards trip={trip} />
            </div>
          ))}
        </div>
        )}
        
      </div>
      
    </div>
  );
};

export default MyTrip;
