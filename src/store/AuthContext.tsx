import { createContext, PropsWithChildren, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

export const AuthContext = createContext({
    confirm : '',
    user : '',
    signInWithPhoneNumber : (phoneNumber : string)=>{},
    confirmOtp : (otp : string)=>{},
    signOut : ()=>{}
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [confirm, setConfirm] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Handle login
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (user) {
      console.log("logged In");
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);



  async function signInWithPhoneNumber(phoneNumber : string) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        console.log("confirm = ", confirmation);
       
        return confirmation;
    } catch (error) {
      console.error("Error signing in", error);
      throw error;
    }
  };

  async function signOut() {
    try {
      await auth().signOut();
      setConfirm(null);
      setUser(null);
      Alert.alert("Signed out successfully");
    } catch (error) {
      console.error("Error signing out", error);
    }
  }


  async function confirmOtp(otp : string) {
    try {
      await confirm.confirm(otp);
    } catch (error) {
      console.log("Invalid code.");
    }
  }


  const value = {
    user,
    confirm,
    signOut,
    confirmOtp,
    signInWithPhoneNumber
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
