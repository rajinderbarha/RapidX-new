import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./src/app/screens/MainScreen";
import PickAndDropScreen from "./src/app/screens/PickAndDropScreen";
import SelectLocationScreen from "./src/app/screens/SelectLocationsScreen";
import WelcomeScreen from "./src/auth/screens/WelcomeScreen";
import AuthScreen from "./src/auth/screens/AuthScreen";
import PaymentScreen from "./src/app/screens/DrawerScreens/Payment";
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
import ProfileContextProvider from "./src/store/ProfileContext";
import RideContextProvider from "./src/store/RideContext";
import RideCancelScreen from "./src/app/screens/RideCancelScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
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
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={AuthenticatedStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
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
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!token ? <AuthStack /> : <DrawerNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
});
