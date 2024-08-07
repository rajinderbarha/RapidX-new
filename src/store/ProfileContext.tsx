import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ProfileContext{
    name : string;
    setName : (token: string)=>void
    phNumber : string
    setPhNumber :(number: string)=>void
}

export const ProfileContext = createContext<ProfileContext>({
    name : '',
    setName : ()=>{},
    phNumber : '+910012211999',
    setPhNumber : ()=>{}
})


export default function ProfileContextProvider({children}: PropsWithChildren){
    const [name, setName] = useState('');
    const [phNumber, setPhNumber] = useState('+910012211999');

  



const value = {
    name,
    setName,
    phNumber,
    setPhNumber
}

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
