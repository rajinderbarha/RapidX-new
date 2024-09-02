import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import { useContext } from "react";
import { ProfileContext } from "../src/store/ProfileContext";

interface updatingUserProps {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string | null;
}

export default async function AuthenticatePhoneNumber(
  phoneNumber: string,
  setIsNewUser: (value: any) => void,
  setIsProfileCompleted: (value: any) => void
) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/token/";

  try {
    const response = await axios.post(URL, { phoneNumber });
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
        setIsProfileCompleted(false);
      } else {
        // console.log('isnewuser: ',isNewUser)
        setIsProfileCompleted(true);
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
export async function fetchUserId() {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      console.log("got Id");
      return userId;
    }
  } catch (error) {
    console.log("error fetching userId : ", error);
  }
}

export async function logout() {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("profileData");
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export async function UpdateUser({
  phoneNumber,
  firstName,
  lastName,
  email,
}: updatingUserProps) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/update-user";
  const gender = "Male";
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjJmZTg4YzdkNWQ0NzljYWIzM2EyYyIsImlhdCI6MTcyMzQ0Mjg0MywiZXhwIjoxNzI2MDM0ODQzfQ.FSpBpqBYYC1gtWIjfci4N3WI7dtwHpba-uQc_MvEjhU",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        firstName,
        lastName,
        email,
        gender,
      }),
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Message: ${errorText}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedProfileData = { firstName, lastName, email, phoneNumber };

    await AsyncStorage.setItem(
      "profileData",
      JSON.stringify(updatedProfileData)
    ).then(() => {
      console.log("updated profile in async storage");
    });

    console.log("Updated Profile");
  } catch (error: any) {
    // Log detailed error information
    console.error("Error in updating User: ", error.message);
    console.error("Stack trace: ", error.stack);
  }
}

export async function getDriverDetails() {
  const URL =
    "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/ride-accept-driver";

  const ride_id = await fetchUserId();
  const driver_id = "66b9f461091131eca3542607";

  const location = {
    latitude: 30.70879140071582,
    longitude: 76.70999232731619,
  };

  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjJmZTg4YzdkNWQ0NzljYWIzM2EyYyIsImlhdCI6MTcyMzQ0Mjg0MywiZXhwIjoxNzI2MDM0ODQzfQ.FSpBpqBYYC1gtWIjfci4N3WI7dtwHpba-uQc_MvEjhU",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ride_id, driver_id, location }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    const data = await response.json();

    if (!data.rideDetails || !data.rideDetails.driver_details) {
      throw new Error("Unexpected response structure: Missing driver details");
    }

    console.log("driverresponse", data);
    return data.rideDetails.driver_details;
  } catch (error: any) {
    if (error.name === "TypeError") {
      console.error("Network or CORS error:", error.message);
    } else {
      console.error("Error in updating Driver:", error.message);
    }
    throw error;
  }
}
