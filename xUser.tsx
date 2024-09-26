
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import RideBooking from '@/components/RideBooking';
// import { io } from 'socket.io-client';

// const UserHome = () => {
//   const [userData, setUserData] = useState(null);
//   const [showRideBooking, setShowRideBooking] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('userToken');
//         const user = JSON.parse(localStorage.getItem('userData'));

//         if (!token || !user) {
//           router.push('/login');
//         } else {
//           setUserData(user);
//           setLoading(false);

//           // Connect to socket server
//           const socketConnection = io('http://localhost:8000'); // Replace with your server URL
//           setSocket(socketConnection);

//           // Emit user connection event
//           socketConnection.emit('userConnected', { userId: user._id });

//           // Handle socket errors
//           socketConnection.on('error', (err) => {
//             console.error('Socket error:', err);
//             setError('Socket connection error');
//           });

//           return () => {
//             if (socketConnection) socketConnection.disconnect();
//           };
//         }
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//         setError('Failed to load user data.');
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [router]);

//   const handleBookRideClick = () => {
//     setShowRideBooking(true); // Show the ride booking component
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       {userData ? (
//         <>
//           <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
//           <p><strong>ID:</strong> {userData._id}</p>
//           <p><strong>SOCKET ID:</strong> {userData.socket_id}</p>
//           <p><strong>First Name:</strong> {userData.firstName}</p>
//           <p><strong>Last Name:</strong> {userData.lastName}</p>

//           {!showRideBooking && (
//             <button onClick={handleBookRideClick}>Book Ride</button>
//           )}

//           {showRideBooking && <RideBooking />}
//         </>
//       ) : (
//         <p>Unable to fetch user information.</p>
//       )}
//     </div>
//   );
// };

// export default UserHome;
