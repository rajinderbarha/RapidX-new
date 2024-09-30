import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// const SERVERURL = 'http://localhost:8000'
const SERVERURL = "https://rw6v05jh-8000.inc1.devtunnels.ms";

export default async function phoneAuthentication(
  phone: string,
) {
  // const URL =  SERVERURL+"/api/drivers/signup-without-otp";
  const URL = SERVERURL + "/api/users/signup";

  try {
    const response = await axios.post(URL, { phone_number: phone });

   return response.data;
  } catch (error) {
    console.log("error in authentication : ", error);
  }
}

export async function verifyOtp(
  phone_number: string,
  otp: string,
  setIsNewUser: (value: any) => void,
  setIsProfileCompleted: (value: any) => void
) {
  const URL = SERVERURL + "/api/users/signup/verify";
  try {
    const response = await axios.post(URL, { phone_number, otp });
    console.log("Response data:", response.data);
    if (response.data && response.data.user) {
      const responseData = response.data;
      const userData = response.data.user;
      const receivedToken = response.data.token;
      const userId = userData._id;
      const isNewUser = userData?.is_new_user;
      console.log("isnewuser: ", responseData);
      if (isNewUser) {
        setIsNewUser(true);
        setIsProfileCompleted("no");
      } else {
        // console.log('isnewuser: ',isNewUser)
        setIsProfileCompleted("yes");
      }

      if (receivedToken && userId) {
        await AsyncStorage.setItem("token", receivedToken).then(() =>
          console.log("token added")
        );
        await AsyncStorage.setItem("userId", userId).then(() =>
          console.log("Id added")
        );
        return responseData;
      } else {
        console.log("Token or Id not found in the response.");
      }
    }
  } catch (error) {
    console.log("error in authentication : ", error);
  }
}
