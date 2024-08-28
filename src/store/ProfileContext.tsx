import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ProfileContext {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  email: string;
  setEmail: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  isNewUser: boolean ;
  setIsNewUser: (value: boolean) => void;
  isProfileCompleted: boolean ;
  setIsProfileCompleted: (value: any) => void;
  picture : string,
  setPicture : (uri : string)=>void
}

export const ProfileContext = createContext<ProfileContext>({
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  email: "",
  setEmail: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  isNewUser: false,
  setIsNewUser: () => {},
  isProfileCompleted: false,
  setIsProfileCompleted: () => {},
  setPicture :()=>{},
  picture : ''
});

export default function ProfileContextProvider({
  children,
}: PropsWithChildren) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(true);
  const [picture, setPicture] = useState('');

  const value = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    isNewUser,
    setIsNewUser,
    isProfileCompleted,
    setIsProfileCompleted,
    email,
    setEmail,
    picture,
    setPicture
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
