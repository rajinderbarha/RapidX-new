import axios from "axios";

export default async function MapData(
  origin: any,
  destination: any,
  distance: any,
  duration: any,
  pickupAddress: any,
  dropAddress: any
) {
  const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/users/fares";

  try {
    const response = await axios.post(URL, {
      origin: origin,
      destination: destination,
      distance: distance,
      duration: duration,
      dropAddress: dropAddress,
      pickupAddress: pickupAddress,
    });

    return response.data.fare;
  } catch (error) {
    console.log("error in mapData : ", error);
  }

  return;
}

 // {
    //     "driver_id": 9,
    //     "name": "Driver Nine",
    //     "latitude": 30.7280,
    //     "longitude": 76.7050,
    //     "distance_from_user_km": 2.0
    // },
    // {
    //     "driver_id": 10,
    //     "name": "Driver Ten",
    //     "latitude": 30.7380,
    //     "longitude": 76.7150,
    //     "distance_from_user_km": 3.2
    // }
    // {
    //     "driver_id": 1,
    //     "name": "Driver One",
    //     "latitude": 30.7200,
    //     "longitude": 76.7000,
    //     "distance_from_user_km": 1.5
    // },
    // {
    //     "driver_id": 2,
    //     "name": "Driver Two",
    //     "latitude": 30.7300,
    //     "longitude": 76.7100,
    //     "distance_from_user_km": 2.5
    // },
    // {
    //     "driver_id": 3,
    //     "name": "Driver Three",
    //     "latitude": 30.7400,
    //     "longitude": 76.7200,
    //     "distance_from_user_km": 3.5
    // },