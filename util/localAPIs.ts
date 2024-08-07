import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function AuthenticatePhoneNumber(phoneNumber: string) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/token/";

  try {
    const response = await axios.post(URL, { phoneNumber });
    const userData = response.data.user ;
    const receivedToken = response.data.user.token ;
    console.log(response.data)

    await AsyncStorage.setItem("token", receivedToken).then(() =>
      console.log("token added")
    );
    return userData;
  } catch (error) {
    console.log("error in authentication : ", error);
  }
}





export async function fetchToken() {
  try {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
        console.log("got token");
        return storedToken;
    }
  } catch (error) {
    console.log("error fetching token : ", error);
  }
}

export async function logout() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}



export async function UpdateUser(phoneNumber: string, name : string) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/update-user";

  console.log(phoneNumber, name)
  try {
     const response = await axios.put(URL, { phoneNumber, name });

     console.log(response)
  
  } catch (error) {
    console.log("error in updating User : ", error);
  }
}