import { createContext } from "react";

export const RideContext = createContext({})



export default function RideContextProvider(){

    


    const value = {}
    


  return (
    <RideContext.Provider value={value}>{}</RideContext.Provider>
  );
};
