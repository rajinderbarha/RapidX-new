// import axios from "axios";

// export default async function MapData(
//   user_id: string,
//   origin: {
//     latitude: number;
//     longitude: number;
//   },
//   destination: {
//     latitude: number;
//     longitude: number;
//   },
//   distance: number,
//   duration: number,
//   pickupAddress: string,
//   dropAddress: string
// ) {
//   const URL =
//     "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/ride-book-user";
//   //gets fare price
//   try {
//     const response = await axios.post(
//       URL,
//       {
//         user_id: user_id,
//         user_origin: origin,
//         user_destination: destination,
//         distance: distance,
//         duration: duration,
//         dropAddress: dropAddress,
//         pickupAddress: pickupAddress,
//       },
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjJmZTg4YzdkNWQ0NzljYWIzM2EyYyIsImlhdCI6MTcyMzQ0Mjg0MywiZXhwIjoxNzI2MDM0ODQzfQ.FSpBpqBYYC1gtWIjfci4N3WI7dtwHpba-uQc_MvEjhU",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("response: ", response.data);

//     return response.data.fares;
//   } catch (error) {
//     console.log("error in mapData : ", error);
//   }

//   return;
// }

export default async function MapData(
  user_id: string,
  origin: {
    latitude: number;
    longitude: number;
  },
  destination: {
    latitude: number;
    longitude: number;
  },
  distance: number,
  duration: number,
  pickupAddress: string,
  dropAddress: string
) {
  const URL =
    "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/ride-book-user";

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjJmZTg4YzdkNWQ0NzljYWIzM2EyYyIsImlhdCI6MTcyMzQ0Mjg0MywiZXhwIjoxNzI2MDM0ODQzfQ.FSpBpqBYYC1gtWIjfci4N3WI7dtwHpba-uQc_MvEjhU",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        user_origin: origin,
        user_destination: destination,
        distance: distance,
        duration: duration,
        dropAddress: dropAddress,
        pickupAddress: pickupAddress,
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

    if (!data.rideDetails || typeof data.rideDetails.fares !== "number") {
      // Handle missing or incorrect data
      console.error('Expected "fares" in "rideDetails" but got:', data);
      throw new Error('Missing or invalid "fares" in response data.');
    }

    // console.log("response: ", data);

    return data.rideDetails.fares;
  } catch (error: any) {
    // Log detailed error information
    console.error("Error in mapData: ", error.message);
    console.error("Stack trace: ", error.stack);
  }

  return;
}

export async function fetchFare(distance: number, duration: number) {
  const URL =
    "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/calculate-fares";

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjJmZTg4YzdkNWQ0NzljYWIzM2EyYyIsImlhdCI6MTcyMzQ0Mjg0MywiZXhwIjoxNzI2MDM0ODQzfQ.FSpBpqBYYC1gtWIjfci4N3WI7dtwHpba-uQc_MvEjhU",
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
