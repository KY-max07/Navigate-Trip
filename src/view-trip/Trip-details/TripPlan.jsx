
import React from 'react'
import TripPlanCards from './TripPlanCards'


const TripPlan = ({trip}) => {
  return (
    <div className="border-t-1 border-black/30 md:mx-6">
    <h1 className="my-6 font-secondary text-3xl mx-2">Travel Plan</h1>
    <div >
      {trip?.tripData?.itinerary?.map((day, index)=>(
        <div key={index}>
            <h1 className='my-6 font-secondary text-2xl mx-2'>Day-0{day.day}</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {trip?.tripData?.itinerary?.[index]?.places?.map((places, ind)=>(
                <div key={ind} className='border rounded-md shadow hover:scale-102 p-2 relative bg-gray-900/20 md:bg-gray-200 pb-8 md:pb-2 transition-all'>
                    <h2 className='font-secondary text-side'>{places.to_visit}</h2>
                    <TripPlanCards places={places}/>
                </div>
            ))}
            </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default TripPlan