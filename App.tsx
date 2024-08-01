import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text } from "react-native";
import MainScreen from "./src/app/screens/MainScreen";
import LocationContextProvider from "./src/store/LocationContext";
import PickAndDropScreen from "./src/app/screens/PickAndDropScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/auth/screens/WelcomeScreen";
import AuthScreen from "./src/auth/screens/AuthScreen";
import SelectLocationButton from "./src/app/components/SelectLocationButton";
import AuthContextProvider, { AuthContext } from "./src/store/AuthContext";
import { useContext } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectLocationScreen from './src/app/screens/SelectLocationsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer'
import PaymentScreen from './src/app/screens/DrawerScreens/Payment';
import AboutUsScreen from './src/app/screens/DrawerScreens/AboutUs';
import TermsConditionsScreen from './src/app/screens/DrawerScreens/TermsConditions';
import PrivacyPolicyScreen from './src/app/screens/DrawerScreens/PrivacyPolicy';
import ContactUsScreen from './src/app/screens/DrawerScreens/ContactUs';
import CustomDrawerContent from './src/app/components/CustomDrawerContent';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#ffffff",
        },
      }}
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
          headerLeft: () => {
            return (
              <Image
                style={{ height: 50, width: 100, resizeMode: "contain" }}
                source={require("./assets/data/rapidxLogo.png")}
              />
            );
          },
          headerRight: () => (
            <SelectLocationButton
              name={"question-mark"}
              TEXT={"Help"}
              style={styles.helpBtn}
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
      screenOptions={{
        cardStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drop"
        component={PickAndDropScreen}
        options={{ presentation: "modal" }}
      />
     
      <Stack.Screen
        name="Locations"
        component={SelectLocationScreen}
        
      />
    </Stack.Navigator>
    
  );
}


function DrawerNavigator(){
  return(
    <Drawer.Navigator drawerContent={(props)=><CustomDrawerContent {...props} />  }  >
      <Drawer.Screen name='Home' component={AuthenticatedStack} options={{headerShown : false}} />
      <Drawer.Screen name='Payment' component={PaymentScreen}  />
      <Drawer.Screen name='About Us' component={AboutUsScreen} />
      <Drawer.Screen name='Terms & Conditions' component={TermsConditionsScreen} />
      <Drawer.Screen name='Privacy Policy' component={PrivacyPolicyScreen} />
      <Drawer.Screen name='Contact Us' component={ContactUsScreen} />
    </Drawer.Navigator>
  )
}


function Navigation() {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!user && <AuthStack />}
    {user && <DrawerNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
      <LocationContextProvider>
        <Navigation />
      </LocationContextProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  helpBtn: {
    // backgroundColor : 'grey',
    // height : 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 0,
    width: "auto",
    gap: 2,
    // alignSelf : 'baseline'
  },
});
