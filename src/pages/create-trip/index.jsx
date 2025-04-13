import { Button } from "@/components/ui/button";
import { AI_PROMPT, Budget, SelectTravelList } from "@/Constants/Options";
import { generateTravelPlan } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";


const CreateTrip = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputForm = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
    

  const login = useGoogleLogin(
    {
      onSuccess:(v)=>console.log(v),
      onError:k=>console.log(k)

    }
  )
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.noofdays > "5" ||
      !formData?.budget ||
      !formData?.traveller ||
      !formData?.location
    ) {
      toast(<h1 className="text-lg font-secondary">Invaild Request! </h1>, {
        description: <h1>Please enter all details.</h1>,
        variant: "destructive",
        action: {
          label: "Undo",
        },
        className: " bg-black ",
      });
    } else {
      setLoading(true);
      const prompt = AI_PROMPT.replace(/{location}/g, formData.location.label)
        .replace("{traveller}", formData.traveller)
        .replace("{totaldays}", formData.noofdays)
        .replace("{budget}", formData.budget);

      const result = await generateTravelPlan(prompt);

      console.log(result);
      setLoading(false);
      setFormData([]);
    }
  };

  return (
    <div className="container mt-15 p-10 md:mx-auto flex flex-col justify-between md:w-3/4 relative ">
      <h1 className="text-3xl md:text-4xl text-side font-secondary mb-2 md:mb-5">
        {" "}
        Tell us Your preferences😊:
      </h1>
      <p className="text-gray-700 md:font-primary text-md md:text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized plan based on your preferences.
      </p>
      <div className="flex flex-col gap-10  mt-10">
        <div>
          <p className=" mb-2 md:mt-15 font-secondary text-xl md:text-2xl">
            What is destination of choice?
          </p>

          <GooglePlacesAutocomplete
            apiKey={apiKey}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputForm("location", v);
              },
            }}
          />
        </div>
        <div>
          <p className=" mb-2 font-secondary text-xl md:text-2xl">
            How many days are you planning your trip (0-5) :
          </p>
          <input
            type="number"
            name="days"
            required
            placeholder="Ex. 3"
            min={1}
            max={5}
            className="border border-gray-300 w-full h-10 rounded bg-white px-3 font-sans text-gray-700"
            onChange={(e) => handleInputForm("noofdays", e.target.value)}
          />
        </div>
        <div>
          <h3 className=" mb-2 font-secondary text-xl md:text-2xl">
            Whom do you want to travel with :
          </h3>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-20 mt-5   justify-center">
            {SelectTravelList.map((item) => (
              <div
                key={item._id}
                onClick={() => handleInputForm("traveller", item.people)}
                className={`p-4 flex flex-col items-center justify-start border-black border-1 cursor-pointer backdrop-blur-sm rounded-2xl hover:shadow-lg hover:shadow-black hover:bg-gray-200 ${
                  formData?.traveller == item.people &&
                  "shadow-lg shadow-black border-black border-3 bg-gray-300/80 backdrop-blur-2xl "
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-secondary text-2xl mt-2">{item.title}</h2>
                <h2 className="md:font-primary  text-md">{item.desc}</h2>
                <h2 className="font-secondary  text-md mt-2">{item.people}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className=" mb-2 font-secondary text-xl md:text-2xl">
            What is your Budget :
          </h3>
          <p className="text-gray-700 md:font-primary text-md md:text-xl">
            The Budget is exclusively allocated to activities and dining
            purposes.
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-20 mt-5   justify-center">
            {Budget.map((item) => (
              <div
                key={item._id}
                onClick={() => handleInputForm("budget", item.title)}
                className={`p-4 flex flex-col items-center justify-start border-black border-1 cursor-pointer backdrop-blur-sm rounded-2xl hover:shadow-md hover:shadow-black hover:bg-gray-200  ${
                  formData?.budget == item.title &&
                  "shadow-lg shadow-black border-black border-3 bg-gray-300/8 backdrop-blur-2xl "
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-secondary  text-2xl mt-2">{item.title}</h2>
                <h2 className="md:font-primary  text-md">{item.desc}</h2>
                <h2 className="font-secondary text-md mt-2">{item.cost}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" hidden w-full md:flex justify-end md:mt-10 md:px-10">
        <Button
          className="mt-10 md:mx-10 mb-2 md:w-30 font-secondary md:flex md:absolute md:right-2 md:bottom-0 "
          onClick={OnGenerateTrip}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>
      <Button
        className="mt-10 md:mx-10 mb-2 md:w-30 font-secondary md:absolute md:right-2 md:bottom-0 md:hidden"
        onClick={OnGenerateTrip}
      >
        {loading ? "Generating..." : "Generate Travel Plan"}
      </Button>
      <Dialog open={openDialog}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='flex justify-between'><img src="/src/assets/navigate-Trip-light.svg" alt="Navigate-Trip" className="h-7" />
            <button onClick={()=>setOpenDialog(false)} className='relative bottom-3 left-1 bg-white hover:border-2 hover:border-black/40 h-5 w-5 z-50 font-primary rounded '>x</button></DialogTitle>
            <DialogDescription>
              <h1 className="text-2xl md:text-3xl  text-black font-secondary text-start mt-3">Sign In with Google</h1>
              <p className="text-start text-xs md:text-lg md:font-primary md:text-gray-800"> Sign in to the App with Google authentication securely </p>


              <Button onClick={login} className='w-full mt-5'><img src="/src/assets/google.svg" alt="" className="h-4"/>Login with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
     
    </div>
  );
};

export default CreateTrip;
