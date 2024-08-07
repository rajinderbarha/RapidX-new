import { createContext, PropsWithChildren, useState } from "react";

interface RideInterface{
    rideIsBooked : boolean;
    setRideIsBooked : (newState : boolean)=>void
    driver : any;
    setDriver : (newState : any)=> void
}


export const RideContext = createContext<RideInterface>({
    rideIsBooked : false,
    setRideIsBooked : ()=>{},
    driver : null,
    setDriver : ()=>{}
})



export default function RideContextProvider({children}: PropsWithChildren){
    
    const [rideIsBooked, setRideIsBooked] = useState(false);
    const [driver, setDriver] = useState(null);



    const value = {
        rideIsBooked,
        setRideIsBooked,
        driver,
        setDriver
    }
    


  return (
    <RideContext.Provider value={value}>{children}</RideContext.Provider>
  );
};
