import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function AuthenticatePhoneNumber(phoneNumber: string) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/token/";

  try {
    const response = await axios.post(URL, { phoneNumber });
    const userData = response.data.user;
    const receivedToken = response.data.user.token;
    console.log(response.data);

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

export async function UpdateUser(phoneNumber: string, name: string) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/update-user";

  console.log(phoneNumber, name);
  try {
    const response = await axios.put(URL, { phoneNumber, name });

    console.log(response);
  } catch (error) {
    console.log("error in updating User : ", error);
  }
}

// export async function getDriverDetails() {
//   const URL =
//     "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/ride-accept-driver";

//   const ride_id = "66b9b5b36a231a558018d851";

//   const driver_id = "66b9f461091131eca3542607";

//   const location = {
//     latitude: 30.70879140071582,
//     longitude: 76.70999232731619,
//   };

//   try {
//     const response = await axios.put(URL, { ride_id, driver_id, location });

//     console.log("driverresponse", response.data);
//     return response.data.rideDetails.driver_details;
//   } catch (error) {
//     console.log("error in updating User : ", error);
//     throw  error
//   }
// }



export async function getDriverDetails() {
  const URL =
    "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/ride-accept-driver";

  const ride_id = "66b9b5b36a231a558018d851";
  const driver_id = "66b9f461091131eca3542607";

  const location = {
    latitude: 30.70879140071582,
    longitude: 76.70999232731619,
  };

  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjJmZTg4YzdkNWQ0NzljYWIzM2EyYyIsImlhdCI6MTcyMzQ0Mjg0MywiZXhwIjoxNzI2MDM0ODQzfQ.FSpBpqBYYC1gtWIjfci4N3WI7dtwHpba-uQc_MvEjhU',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ride_id, driver_id, location }),
    });

    // Check if the HTTP status is not OK (outside the range of 200–299)
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorMessage}`
      );
    }

    const data = await response.json();

    // Check if the expected data structure exists
    if (!data.rideDetails || !data.rideDetails.driver_details) {
      throw new Error("Unexpected response structure: Missing driver details");
    }

    console.log("driverresponse", data);
    return data.rideDetails.driver_details;
  } catch (error : any) {
    if (error.name === "TypeError") {
      console.error("Network or CORS error:", error.message);
    } else {
      console.error("Error in updating User:", error.message);
    }
    throw error;
  }
}
