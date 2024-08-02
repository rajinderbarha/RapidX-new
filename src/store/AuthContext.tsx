import { createContext, PropsWithChildren, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  confirm: FirebaseAuthTypes.ConfirmationResult | null;
  signInWithPhoneNumber: (
    phoneNumber: string
  ) => Promise<FirebaseAuthTypes.ConfirmationResult | void>;
  confirmOtp: (otp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  confirm: null,
  signInWithPhoneNumber: async () => {},
  confirmOtp: async () => {},
  signOut: async () => {},
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [phnumber, setPhnumber] = useState<string>("");

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        console.log("Logged In");
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setPhnumber(phoneNumber);
      setConfirm(confirmation);
      console.log("confirm =", confirmation);
      return confirmation;
    } catch (error) {
      console.error("Error signing in", error);
      throw error;
    }
  }

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

  async function confirmOtp(otp: any) {

    const [token, setToken] = useState();


    try {
      if (confirm) {
        await confirm.confirm(otp);
        // const response = await fetch('https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/verify-otp', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${"mySuperSecretKey123"}`,
        //   },
        //   body: JSON.stringify({
        //     phnumber,
        //     otp,
        //   }),
        // });
  
        // const data = await response.json();
        // if (response.ok) {
        //   setToken(data.token);
        // } else {
        //   console.error(data);
        //   alert('Invalid code.');
        // }
      
       
      
      } else {
        throw new Error("No confirmation result found");
      }
    } catch (error) {
      console.log("Invalid code", error);
    }
  }

  const value = {
    user,
    confirm,
    signInWithPhoneNumber,
    confirmOtp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
