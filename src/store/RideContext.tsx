import { createContext, PropsWithChildren, useState } from "react";

interface RideInterface{
    rideIsBooked : boolean;
    setRideIsBooked : (newState : boolean)=>void
    driver : any;
    setDriver : (newState : any)=> void
    rideIsCompleted : boolean;
    setRideIsCompleted : (newState : boolean)=>void
    paymentIsDone : boolean;
    setPaymentIsDone : (newState : boolean)=>void
    resetRideData : ()=>void
}


export const RideContext = createContext<RideInterface>({
    rideIsBooked : false,
    setRideIsBooked : ()=>{},
    driver : null,
    setDriver : ()=>{},
    rideIsCompleted : false,
    setRideIsCompleted : ()=>{},
    paymentIsDone : false,
    setPaymentIsDone : ()=>{},
    resetRideData : ()=>{}
})



export default function RideContextProvider({children}: PropsWithChildren){
    
    const [rideIsBooked, setRideIsBooked] = useState(false);
    const [rideIsCompleted, setRideIsCompleted] = useState(false);
    const [paymentIsDone, setPaymentIsDone] = useState(false);
    const [driver, setDriver] = useState(null);

  
    function resetRideData(){
      setRideIsBooked(false),
      setRideIsCompleted(false),
      setPaymentIsDone(false),
      setDriver(null)
    };
    

    const value = {
        rideIsBooked,
        setRideIsBooked,
        driver,
        setDriver,
        rideIsCompleted,
        setRideIsCompleted,
        resetRideData,
        paymentIsDone,
        setPaymentIsDone
    }
    


  return (
    <RideContext.Provider value={value}>{children}</RideContext.Provider>
  );
};
