// import axios from "axios";
import { fetchToken, fetchUserId } from "./localAPIs";

const SERVERURL = 'https://rw6v05jh-8000.inc1.devtunnels.ms'

interface mapDataInterface {
 
    user_origin: {
      latitude: number;
      longitude: number;
    };
    user_destination: {
      latitude: number;
      longitude: number;
    };
    distance: number;
    duration: number;
    pickupAddress: string;
    dropAddress: string;
    firstName : string
  };


export default async function MapData(userData : mapDataInterface) {
  const URL =
   SERVERURL+"/api/users/ride-book-user";
  const user_id = await fetchUserId();
  const storedToken = await fetchToken();


  try {

     console.log('Requesting to: ', URL);
  console.log('Request Body: ', {
    user_id: user_id,
    user_origin: userData.user_origin,
    user_destination: userData.user_destination,
    distance: userData.distance,
    duration: userData.duration,
    dropAddress: userData.dropAddress,
    pickupAddress: userData.pickupAddress,
        firstName : userData.firstName

  });


    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        user_origin: userData.user_origin,
    user_destination: userData.user_destination,
        distance: userData.distance,
        duration: userData.duration,
        dropAddress: userData.dropAddress,
        pickupAddress: userData.pickupAddress,
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

    const data = await response.json();

    if (!data.rideDetails.driver_details) {
      throw new Error("Unexpected response structure: Missing driver details");
    }

    // console.log("response: ", data);

    // return data;
    return data.rideDetails.driver_details;
  } catch (error: any) {
    // Log detailed error information
    console.error("Error in mapData: ", error.message);
    console.error("Stack trace: ", error.stack);
  }

  return;
}

export async function fetchFare(distance: number, duration: number) {
  const URL =
    SERVERURL+"/api/users/calculate-fares";
  const token = await fetchToken()
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "66c86a37541aed473d0d49b6",
        distance: distance,
        duration: duration,
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

    const data = await response.json();

    if (!data.fare) {
      // Handle missing or incorrect data
      console.error('Expected "fare" in "Details" but got:', data);
      throw new Error('Missing or invalid "fare" in response data.');
    }

    return data.fare;
  } catch (error: any) {
    // Log detailed error information
    console.error("Error in mapData: ", error.message);
    console.error("Stack trace: ", error.stack);
  }

  return;
}
