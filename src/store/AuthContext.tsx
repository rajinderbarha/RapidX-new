import { createContext, PropsWithChildren, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  confirm: FirebaseAuthTypes.ConfirmationResult | null;
  signInWithPhoneNumber: (phoneNumber: string) => Promise<FirebaseAuthTypes.ConfirmationResult | void>;
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
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

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

  async function confirmOtp(otp: string) {
    try {
      if (confirm) {
        await confirm.confirm(otp);
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
