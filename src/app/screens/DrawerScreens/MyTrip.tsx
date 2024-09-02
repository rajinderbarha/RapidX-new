import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import RideItemComponent from "../../components/MyRides/RideItemComponent";

const rideDetailsArray = [
  {
    id: "1",
    rideInfo: {
      pickupLocation: {
        location: "Douglas Crescent Road , Venie",

        dateTime: "Mon 29, July 3:40PM",
      },
      dropLocation: {
        location: "Logan Avenue , Aura",
        dateTime: "Mon 29, July 3:55PM",
      },
    },
    driver: {
      name: "Gorge Jacob",
      bikeType: "Mini",
      bikeNumber: "G5-567-JH",
      imageUri: "https://randomuser.me/api/portraits/men/41.jpg",
      userRating: 4.5,
      driverRating: 5,
    },
    billDetail: {
      subtotal: 50.0,
      tax: 0.0,
      totalAmount: 50.0,
      paymentMethod: "Credit card",
    },
  },
  {
    id: "2",
    rideInfo: {
      pickupLocation: {
        location: "Maple Street, Downtown",
        dateTime: "Tue 30, July 10:00AM",
      },
      dropLocation: {
        location: "Pine Avenue, Midtown",
        dateTime: "Tue 30, July 10:25AM",
      },
    },
    driver: {
      name: "Linda Clark",
      bikeType: "Sedan",
      bikeNumber: "G8-452-XY",
      imageUri: "https://randomuser.me/api/portraits/women/25.jpg",
      userRating: 4.0,
      driverRating: 4.5,
    },
    billDetail: {
      subtotal: 35.0,
      tax: 2.5,
      totalAmount: 37.5,
      paymentMethod: "UPI",
    },
  },
  {
    id: "3",
    rideInfo: {
      pickupLocation: {
        location: "Oakwood Boulevard , Lakeside",
        dateTime: "Wed 31, July 5:15PM",
      },
      dropLocation: {
        location: "Cedar Road, Greenfield",
        dateTime: "Wed 31, July 5:45PM",
      },
    },
    driver: {
      name: "Michael Smith",
      bikeType: "SUV",
      bikeNumber: "Z2-764-KL",
      imageUri: "https://randomuser.me/api/portraits/men/32.jpg",
      userRating: 4.7,
      driverRating: 5,
    },
    billDetail: {
      subtotal: 60.0,
      tax: 5.0,
      totalAmount: 65.0,
      paymentMethod: "Debit card",
    },
  },
];

// export default function MyTripScreen() {
//   return (
//     <Text>Hello</Text>
//     // <FlatList
//     //   data={rideDetailsArray}
//     //   renderItem={({ item }) => {
//     //     return (
//     //       <RideItemComponent
//     //         dropAddress={item.rideInfo.dropLocation.location}
//     //         pickupAddress={item.rideInfo.pickupLocation.location}
//     //         dropDateTime={item.rideInfo.dropLocation.dateTime}
//     //         pickupDateTime={item.rideInfo.pickupLocation.dateTime}
//     //         total={item.billDetail.totalAmount}
//     //       />
//     //     );
//     //   }}
//     //   keyExtractor={(item) => item.id}
//     // />
//   );
// }

export default function MyTripScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}> 
      <FlatList
        data={rideDetailsArray}
        renderItem={({ item }) => {
          console.log('Rendering item:', item);
          return (
            <View style={{flex : 1, marginVertical : 10}}>
              {/* <Text>xx</Text> */}
            <RideItemComponent
            dropAddress={item.rideInfo.dropLocation.location}
            pickupAddress={item.rideInfo.pickupLocation.location}
            dropDateTime={item.rideInfo.dropLocation.dateTime}
            pickupDateTime={item.rideInfo.pickupLocation.dateTime}
            total={item.billDetail.totalAmount}
          />
          </View>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }} // Add padding for visibility
      />
    </View> 
  );
}
