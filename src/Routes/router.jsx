import UserLayout from "@/layouts/UserLayout";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import CreateTrip from "@/pages/create-trip";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create-trip", element: <CreateTrip /> },
    
    ],
  },

]);
