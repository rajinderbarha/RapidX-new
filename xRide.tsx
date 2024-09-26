
// import React, { useState, useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { GoogleMap, Marker, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
// import axios from 'axios';

// const mapContainerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 30.7046, // Chandigarh latitude
//   lng: 76.7179, // Chandigarh longitude
// };

// const RideBooking = () => {
//   const [pickupAddress, setPickupAddress] = useState('');
//   const [dropAddress, setDropAddress] = useState('');
//   const [pickupCoordinates, setPickupCoordinates] = useState(null);
//   const [dropCoordinates, setDropCoordinates] = useState(null);
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [rideBooked, setRideBooked] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [rideDetails, setRideDetails] = useState(null);
//   const [driverDetails, setDriverDetails] = useState(null);
//   const [rideCancelled, setRideCancelled] = useState(false);
//   const pickupAutocompleteRef = useRef(null);
//   const dropAutocompleteRef = useRef(null);
//   const [driverLocation, setDriverLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);

//   const userId = localStorage.getItem('userId');

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q',
//     libraries: ['places'],
//   });

//   useEffect(() => {
//     const socketConnection = io('http://localhost:8000'); // Replace with your server URL
//     setSocket(socketConnection);

//     // Listen for ride booking confirmation
//     socketConnection.on('rideBooked', (data) => {
//       console.log('Ride Booked:', data);
//       setRideBooked(true);
//       setLoading(false);
//     });

//     socketConnection.on('rideConfirmed', (data) => {
//       console.log('Ride confirmed:', data);
//       setRideDetails(data);
//       setDriverDetails(data.driverDetails);
//       setRideBooked(true);
//       setLoading(false);
//     });

//     socketConnection.on('noDriversAvailable', (data) => {
//       console.log(data.message);
//       setLoading(false);
//     });

//     // Cleanup
//     return () => {
//       socketConnection.disconnect();
//     };
//   }, []);

//   const handlePlaceSelect = (setAddress, setCoordinates) => () => {
//     const place =
//       pickupAutocompleteRef.current?.getPlace() ||
//       dropAutocompleteRef.current?.getPlace();

//     if (!place || !place.formatted_address || !place.geometry) {
//       console.error('Autocomplete place object missing necessary fields:', place);
//       return;
//     }

//     setAddress(place.formatted_address);
//     setCoordinates({
//       latitude: place.geometry.location.lat(),
//       longitude: place.geometry.location.lng(),
//     });
//   };

//   useEffect(() => {
//     if (!socket) return;

//     // Listen for driver location updates
//     socket.on('driverLocationUpdate', ({ driverLocation }) => {
//       console.log('Driver location updated:', driverLocation);
//       setDriverLocation(driverLocation);
//     });

//     // Emit the user's current location to the server
//     if (pickupCoordinates) {
//       socket.emit('userLocationUpdate', { userLocation: pickupCoordinates });
//     }

//     return () => {
//       socket.off('driverLocationUpdate');
//     };
//   }, [pickupCoordinates, socket]);

//   const handleMapClick = (e, setCoordinates) => {
//     setCoordinates({
//       latitude: e.latLng.lat(),
//       longitude: e.latLng.lng(),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rideData = {
//       distance,
//       duration,
//       pickupAddress,
//       dropAddress,
//       user_origin: pickupCoordinates,
//       user_destination: dropCoordinates,
//       user_id: userId,
//     };

//     if (socket) {
//       socket.emit('bookRide', rideData);
//       setLoading(true);
//     }
//   };

//   const cancelRide = (rideId, cancelledBy) => {
//     if (socket) {
//       console.log('Sending cancelRide event:', { rideId, cancelledBy });
//       socket.emit('cancelRide', { rideId, cancelledBy });
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.on('rideCancelled', (data) => {
//         console.log(data.message);
//         console.log('Ride was cancelled by:', data.cancelledBy);
//         setRideBooked(false); // Reset the ride booked state
//         setRideCancelled(true);
//         alert(`Ride was cancelled by ${data.cancelledBy}`);
//       });

//       // Cleanup
//       return () => {
//         socket.off('rideCancelled');
//       };
//     }
//   }, [socket]);

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading Maps...</div>;
//   }

//   return (
//     <div>
//       <h2>Book a Ride</h2>
//       {rideCancelled && <p>Ride was cancelled by {rideDetails?.cancelledBy}</p>}
//       {rideBooked && (
//         <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
//           {pickupCoordinates && (
//             <Marker
//               position={{
//                 lat: pickupCoordinates.latitude,
//                 lng: pickupCoordinates.longitude,
//               }}
//             />
//           )}
//           {driverLocation && (
//             <Marker
//               position={{
//                 lat: driverLocation.latitude,
//                 lng: driverLocation.longitude,
//               }}
//             />
//           )}
//         </GoogleMap>
//       )}
//       {!rideBooked && !loading && (
//         <>
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={14}
//             onClick={(e) => {
//               if (!pickupCoordinates) {
//                 handleMapClick(e, setPickupCoordinates);
//               } else if (!dropCoordinates) {
//                 handleMapClick(e, setDropCoordinates);
//               }
//             }}
//           >
//             {pickupCoordinates && (
//               <Marker
//                 position={{
//                   lat: pickupCoordinates.latitude,
//                   lng: pickupCoordinates.longitude,
//                 }}
//                 label="Pickup"
//               />
//             )}
//             {dropCoordinates && (
//               <Marker
//                 position={{
//                   lat: dropCoordinates.latitude,
//                   lng: dropCoordinates.longitude,
//                 }}
//                 label="Drop-off"
//               />
//             )}
//           </GoogleMap>

//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Pickup Address:</label>
//               <Autocomplete
//                 onLoad={(autocomplete) => (pickupAutocompleteRef.current = autocomplete)}
//                 onPlaceChanged={handlePlaceSelect(setPickupAddress, setPickupCoordinates)}
//               >
//                 <input
//                   type="text"
//                   placeholder="Enter pickup location"
//                   value={pickupAddress}
//                   onChange={(e) => setPickupAddress(e.target.value)}
//                 />
//               </Autocomplete>
//             </div>

//             <div>
//               <label>Drop-off Address:</label>
//               <Autocomplete
//                 onLoad={(autocomplete) => (dropAutocompleteRef.current = autocomplete)}
//                 onPlaceChanged={handlePlaceSelect(setDropAddress, setDropCoordinates)}
//               >
//                 <input
//                   type="text"
//                   placeholder="Enter drop-off location"
//                   value={dropAddress}
//                   onChange={(e) => setDropAddress(e.target.value)}
//                 />
//               </Autocomplete>
//             </div>

//             <div>
//               <label>Distance (in km):</label>
//               <input
//                 type="number"
//                 value={distance}
//                 onChange={(e) => setDistance(e.target.value)}
//               />
//             </div>

//             <div>
//               <label>Duration (in minutes):</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//               />
//             </div>

//             <button type="submit">Submit Ride</button>
//           </form>
//         </>
//       )}

//       {loading && !rideBooked && (
//         <p style={{ color: 'black' }}>
//           Ride booked. Waiting for a driver to pick up the request...
//         </p>
//       )}

//       {rideBooked && driverDetails && (
//         <div>
//           <h3>Ride Confirmed!</h3>
//           <p>Ride ID: {rideDetails?.rideId}</p>
//           <p>
//             Driver Name: {driverDetails.first_name} {driverDetails.last_name}
//           </p>
//           <p>Driver Phone: {driverDetails.phone_number}</p>
//           <p>Driver Email: {driverDetails.email}</p>
//           <button
//             onClick={() => cancelRide(rideDetails?.rideId, 'user')}
//             style={{ backgroundColor: 'red', color: 'white' }}
//           >
//             Cancel Ride
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RideBooking;

const rideData = {
    driverDetails: {
      _id: "66f24c59149b0193379e84fb",
      email: "",
      first_name: "inder",
      last_name: "pro 2",
      phone_number: "917454575742"
    },
    driverId: "66f24c59149b0193379e84fb",
    rideDetails: {
      __v: 0,
      _id: "66f2a410d66c22f83061159a",
      createdAt: "2024-09-24T11:35:44.219Z",
      distance: 15,
      driver_details: {
        _id: "66f24c59149b0193379e84fb",
        email: "",
        first_name: "inder",
        last_name: "pro 2",
        phone_number: "917454575742"
      },
      dropAddress: "PM2R+WXG, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160062, India",
      duration: 20,
      extra_distance: 0,
      pickupAddress: "B77, Phase 7, Industrial Area, Sector 73, Sahibzada Ajit Singh Nagar, Punjab 160071, India",
      status: "accepted",
      updatedAt: "2024-09-24T11:35:48.058Z",
      user_destination: {
        latitude: 30.702512771900654,
        longitude: 76.69223137199879
      },
      user_id: {
        _id: "66f2570b149b0193379e8577"
      },
      user_origin: {
        latitude: 30.709735944285637,
        longitude: 76.69897176325321
      },
      waiting_time: 0
    },
    rideId: "66f2a410d66c22f83061159a",
    userDetails: {
      _id: "66f2570b149b0193379e8577",
      email: "",
      firstName: "zxc",
      lastName: "asd",
      phoneNumber: 913256981203
    }
  };
  