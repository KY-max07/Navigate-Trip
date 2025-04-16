
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import TripHero from "../Trip-details/TripHero";
import Hotels from "../Trip-details/Hotels";
import TripPlan from "../Trip-details/TripPlan";




const ViewTrip = () => {
  const { tripID } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    const readDoc = async () => {
      const docRef = doc(db, "AITrips", tripID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast("no such data!!");
      }
    };

    if (tripID) {
      readDoc();
    }
  }, [tripID]);
  return (
    <div className="container mx-auto m-4 w-6/7 flex flex-col gap-6">
      
      <TripHero trip={trip} />
      <Hotels trip={trip} />
      <TripPlan trip={trip}/>
    </div>
  );
};

export default ViewTrip;
