import { createContext, PropsWithChildren, useState } from "react";

interface RideInterface {
  rideIsBooked: boolean;
  setRideIsBooked: (newState: boolean) => void;
  rideIsStarted: boolean;
  setRideIsStarted: (newState: boolean) => void;
  driver: {
    _id: string,
    phone_number: number,
    first_name: string,
    last_name : string ,
    email: string,
    gender: string,
    profile_picture: string,
    rating: number,
    vehicle_image: string,
    vehicle_plate: string,
    vehicle_type: string,
    location : {
      latitude : number,
      longitude : number
    }
  } | null;
  setDriver: (newState: any) => void;
  rideIsCompleted: boolean;
  setRideIsCompleted: (newState: boolean) => void;
  paymentIsDone: boolean;
  setPaymentIsDone: (newState: boolean) => void;
  rideIsAccepted: boolean;
  setRideIsAccepted: (newState: boolean) => void;
  resetRideData: () => void;
  isSocketConnected : boolean;
  setIsSocketConnected : (state : boolean)=>void
  driverReachedLocation : boolean;
  setDriverReachedLocation : (state : boolean)=>void
  rideId : string;
  setRideId : (state : string)=>void
}

export const RideContext = createContext<RideInterface>({
  rideIsBooked: false,
  setRideIsBooked: () => {},
  rideIsStarted: false,
  setRideIsStarted: () => {},
  driver: {
    _id: "",
    phone_number: 0,
    first_name: "",
    last_name : "",
    email: "",
    gender: "",
    profile_picture: "",
    rating: 5,
    vehicle_image: "",
    vehicle_plate: "",
    vehicle_type: "",
    location : {
      latitude : 0,
      longitude : 0
    }
  },
  setDriver: () => {},
  rideIsCompleted: false,
  setRideIsCompleted: () => {},
  paymentIsDone: false,
  setPaymentIsDone: () => {},
  rideIsAccepted :  false,
  setRideIsAccepted : ()=>{},
  resetRideData: () => {},
  isSocketConnected : false,
  setIsSocketConnected : ()=>{},
  rideId : '',
  setRideId : ()=>{},
  driverReachedLocation : false,
  setDriverReachedLocation : ()=>{}
});

export default function RideContextProvider({ children }: PropsWithChildren) {
  const [rideIsBooked, setRideIsBooked] = useState(false);
  const [rideIsCompleted, setRideIsCompleted] = useState(false);
  const [paymentIsDone, setPaymentIsDone] = useState(false);
  const [driver, setDriver] = useState(null);
  const [rideIsStarted, setRideIsStarted] = useState(false);
  const [rideIsAccepted, setRideIsAccepted] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [driverReachedLocation, setDriverReachedLocation] = useState(false);
  const [rideId, setRideId] = useState('');

  function resetRideData() {
    setRideIsBooked(false),
      setRideIsCompleted(false),
      setPaymentIsDone(false),
      setDriver(null);
    setRideIsStarted(false);
    setRideIsAccepted(false);
    setDriverReachedLocation(false);
    setRideId('');
  }

  const value = {
    rideIsBooked,
    setRideIsBooked,
    driver,
    setDriver,
    rideIsCompleted,
    setRideIsCompleted,
    resetRideData,
    paymentIsDone,
    setPaymentIsDone,
    rideIsStarted,
    setRideIsStarted,
    rideIsAccepted,
    setRideIsAccepted,
    isSocketConnected,
    setIsSocketConnected,
    rideId,
    setRideId,
    driverReachedLocation,
    setDriverReachedLocation
  };

  return <RideContext.Provider value={value}>{children}</RideContext.Provider>;
}
