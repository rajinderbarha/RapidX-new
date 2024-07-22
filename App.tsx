import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import LocationContextProvider from './src/store/LocationContext';


export default function App() {
 


  return (
    <>
      <StatusBar style="auto" />
      <LocationContextProvider>
      <MainScreen />
      </LocationContextProvider>
    </>
    
  );
}

