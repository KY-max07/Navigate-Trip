import axios from "axios"

const BASE_URL = `https://places.googleapis.com/v1/places:searchText?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY_P}`


const config ={
    headers:{
        'Content-type': 'application/json',
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY_P,

         'X-Goog-FieldMask':[ 
            'places.id',
            'places.displayName',
            'places.photos'
         ]
    }
}




export const GetPlaceDetails=(data)=>axios.post(BASE_URL, data ,config)

export const PhotoURL = `https://places.googleapis.com/v1/{name}/media?maxHeightPx={600}&maxWidthPx={1600}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY_P}`