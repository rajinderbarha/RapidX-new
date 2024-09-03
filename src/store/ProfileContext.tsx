import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface ProfileContext {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  email: string;
  setEmail: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  isProfileCompleted: string;
  setIsProfileCompleted: (value: string) => void;
  picture: string;
  setPicture: (uri: string) => void;
  resetProfile: () => void;
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
  isProfileCompleted: "",
  setIsProfileCompleted: () => {},
  setPicture: () => {},
  picture: "",
  resetProfile: () => {},
});

export default function ProfileContextProvider({
  children,
}: PropsWithChildren) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState("");
  const [picture, setPicture] = useState("");

  function resetProfile() {
    setEmail("");
    setFirstName(""),
      setLastName(""),
      setPhoneNumber(""),
      setIsNewUser(false),
      setIsProfileCompleted("");
    setPicture("");
  }

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
    setPicture,
    resetProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

