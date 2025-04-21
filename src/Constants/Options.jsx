export const SelectTravelList = [
  {
    _id: 1,
    title: "Just Me",
    desc: "Exploring the world alone.",
    icon: "✈️",
    people: "1 people",
  },
  {
    _id: 2,
    title: "A Couple",
    desc: "Experiencing the journey as one.",
    icon: "🥂",
    people: "2 people",
  },
  {
    _id: 3,
    title: "Family",
    desc: "A Group of Fun, Loving & adventure.",
    icon: "🏡",
    people: "3-5 people",
  },
  {
    _id: 4,
    title: "Friends",
    desc: "Looking to explore and have fun together.",
    icon: "✌🏻",
    people: "2-10 people",
  },
  {
    _id: 5,
    title: "Not Sure",
    desc: "Still figuring out the travel plans.",
    icon: "❓",
    people: "1-10 people",
  },
];
export const Budget = [
  {
    _id: 1,
    title: "Low",
    desc: "For budget-conscious travelers.",
    icon: "🪙",
    cost: "0-100 USD",
  },
  {
    _id: 2,
    title: "Moderate",
    desc: "Bit more for comfort and quality.",
    icon: "💵",
    cost: "100-1000 USD",
  },
  {
    _id: 3,
    title: "High",
    desc: "Luxury and premium experiences.",
    icon: "💰",
    cost: "1000+ USD",
  },
];
export let config = {};

export const AI_PROMPT = `You are a travel planner. Generate a travel plan for {location} for a {traveller} for {totaldays}(strictly follow) on a {budget} budget.
  Return the response strictly in JSON format with the following structure:
  
  
  {
    "hotels": [
      {
        "name": "Hotel Name",
        "address": "Hotel Address",
        "price": "Hotel Price",
        "image_url": "Hotel Image URL",
        "geo": { "lat": 0.0, "lng": 0.0 },
        "rating": 0.0,
        "description": "Hotel Description"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "places":(min:4(if not possible then 2/3) and max:5-6, ideal=4) [
          {
            "name": "Place Name",
            "details": "Place Details",
            "image_url": "Place Image URL",
            "geo": { "lat": 0.0, "lng": 0.0 },
            "address": "Place Address",
            "ticket_price": "Place Ticket Pricing",
            "rating": 0.0,
            "travel_to_reach": "0 mins/hours",
            "time_to_spend": "0 mins/hours",
            "to_visit":"10:00AM - 12:30PM",
            "best_time_to_visit": "Best Time to Visit"
          }
        ]
      }
    ]
  }
  Only include realistic and accurate travel-related data. suggest atleast 3 and  more  hotels. Structure Timings of a Day to visit places(to_visit).
  `;
