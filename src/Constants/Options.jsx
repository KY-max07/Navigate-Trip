export const SelectTravelList = [
  {
    _id: 1,
    title: "Just Me",
    desc: "A Solo Traveles in Exploration",
    icon: "✈️",
    people: "1 people",
  },
  {
    _id: 2,
    title: "A Couple",
    desc: "Two Traveles in Tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    _id: 3,
    title: "Family",
    desc: "A Group of Fun Loving adv.",
    icon: "🏡",
    people: "3-5 people",
  },
  {
    _id: 4,
    title: "Friends",
    desc: "A Solo Traveles in Exploration",
    icon: "✌🏻",
    people: "2-10 people",
  },
  {
    _id: 5,
    title: "Not Sure",
    desc: "Hope for a Good Trip",
    icon: "✈️",
    people: "1-10 people",
  },
];
export const Budget = [
  {
    _id: 1,
    title: "Low",
    desc: "A Solo Traveles in Exploration",
    icon: "🪙",
    cost: "0-100 USD",
  },
  {
    _id: 2,
    title: "Moderate",
    desc: "Two Traveles in Tandem",
    icon: "💵",
    cost: "100-1000 USD",
  },
  {
    _id: 3,
    title: "High",
    desc: "A Group of Fun Loving adv.",
    icon: "💰",
    cost: "1000+ USD",
  },
];
export let config = {};

export const AI_PROMPT = `You are a travel planner. Generate a travel plan for {location} for a {traveller} for {totaldays} on a {budget} budget.
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
        "places": [
          {
            "name": "Place Name",
            "details": "Place Details",
            "image_url": "Place Image URL",
            "geo": { "lat": 0.0, "lng": 0.0 },
            "ticket_price": "Place Ticket Pricing",
            "rating": 0.0,
            "travel_to_reach": "0 mins/hours",
            "time_to_spend": "0 mins/hours",
            "best_time_to_visit": "Best Time to Visit"
          }
        ]
      }
    ]
  }
  Only include realistic and accurate travel-related data. suggest atleast 3 and more  hotels and 2 and more if convienet based on time places per day and real images.
  `;

