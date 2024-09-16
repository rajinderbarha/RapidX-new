import { io } from "socket.io-client";
const socket = io("https://rw6v05jh-8000.inc1.devtunnels.ms/")




export default socket;

export function updateDriverLocation(){
    console.log('socket On :', socket.connected)
    socket.on('driver-location-updated', (location) => {
        console.log("Driver location updated:", location);
    });
}