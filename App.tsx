import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./src/app/screens/MainScreen";
import PickAndDropScreen from "./src/app/screens/PickAndDropScreen";
import SelectLocationScreen from "./src/app/screens/SelectLocationsScreen";
import WelcomeScreen from "./src/auth/screens/WelcomeScreen";
import AuthScreen from "./src/auth/screens/AuthScreen";
import AboutUsScreen from "./src/app/screens/DrawerScreens/AboutUs";
import TermsConditionsScreen from "./src/app/screens/DrawerScreens/TermsConditions";
import PrivacyPolicyScreen from "./src/app/screens/DrawerScreens/PrivacyPolicy";
import ContactUsScreen from "./src/app/screens/DrawerScreens/ContactUs";
import CustomDrawerContent from "./src/app/components/CustomDrawerContent";
import AuthContextProvider from "./src/store/AuthContext";
import LocationContextProvider from "./src/store/LocationContext";
import CustomBackButton from "./src/ui/CustomBackButton";
import LocalAuthProvider, {
  LocalAuthContext,
} from "./src/store/LocalAuthContext";
import { fetchToken } from "./util/localAPIs";
import ProfileScreen from "./src/app/screens/ProfileScreen";
import ProfileContextProvider, { ProfileContext } from "./src/store/ProfileContext";
import RideContextProvider from "./src/store/RideContext";
import RideCancelScreen from "./src/app/screens/RideCancelScreen";
import MyTripScreen from "./src/app/screens/DrawerScreens/MyTrip";
import PaymentScreen from "./src/app/screens/PaymentScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { io, Socket } from "socket.io-client";
import RideDetailScreen from "./src/app/screens/DrawerScreens/RideDetailScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// interface userData {
//   distance: number;
//   duration: number;
//   dropAddress: string;
//   pickupAddress: string;
//   user_id: string;
//   user_origin: {
//     latitude: any;
//     longitude: any;
//   };
//   user_destination: {
//     latitude: any;
//     longitude: any;
//   };
// }

// const Backend_URL = 'http://localhost:3000'

// export const useSocket = () => {
//   const [driverDetails, setDriverDetails] = useState<any>(null);
//   const socket = io(Backend_URL, { transports: ["websocket"] });

//   useEffect(() => {
//     // Socket connection established
//     socket.on("connect", () => {
//       console.log("Connected to server:", socket.id);
//     });

//     // Listen for the driver's acceptance and details
//     socket.on("rideAccepted", (driverData: any) => {
//       setDriverDetails(driverData);
//       console.log('driverData : ', driverData)
//     });

//     // Clean up on component unmount
//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, ); // Empty dependency array ensures this runs only once


//   const requestRide = (userData : userData) => {
//     console.log("Emitting requestRide:", userData);
//     socket.emit("requestRide", userData);
//   };


//   return { requestRide, driverDetails };
// };



function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth1"
        component={AuthScreen}
        options={{
          title: "",
          headerLeft: () => (
            <Image
              style={styles.logo}
              source={require("./assets/data/rapidxLogo.png")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}


// function ProfileScreen(){
//   return
// }

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } ,  }}

    >
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drop"
        component={PickAndDropScreen}
        options={{
          presentation: "modal",
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen name="Locations" component={SelectLocationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Ride Cancel" component={RideCancelScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Ride Details" component={RideDetailScreen} />
    </Stack.Navigator>
  );
}


function DrawerNavigator() {
  const { setEmail, setFirstName, setLastName, setPhoneNumber } = useContext(ProfileContext);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          const parsedProfileData = JSON.parse(profileData);
          setEmail(parsedProfileData.email);
          setFirstName(parsedProfileData.firstName);
          setLastName(parsedProfileData.lastName);
          setPhoneNumber(parsedProfileData.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
    // dependencies - setEmail, setFirstName, setLastName, setPhoneNumber
  }, []);


  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Trips" component={MyTripScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsConditionsScreen}
      />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
    </Drawer.Navigator>
  );
}

function Navigation() {
  // const { user } = useContext(AuthContext);
  const { token, setToken } = useContext(LocalAuthContext);

  useEffect(() => {
    async function fetchingToken() {
      const storedToken = await fetchToken();
      if (storedToken) {
        setToken(storedToken);
      }
    }
    fetchingToken();
  }, [token]);

  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      {!token ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
      <SafeAreaView style={{ flex: 1 }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocalAuthProvider>
        <AuthContextProvider>
          <LocationContextProvider>
            <ProfileContextProvider>
              <RideContextProvider>
                <Navigation />
              </RideContextProvider>
            </ProfileContextProvider>
          </LocationContextProvider>
        </AuthContextProvider>
      </LocalAuthProvider>
      
    </GestureHandlerRootView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
});
