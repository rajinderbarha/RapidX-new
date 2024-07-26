import { Alert, View } from "react-native";
import OrangeButton from "../../ui/OrangeButton";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

export default function DrawerScreen(){
    const {signOut} = useContext(AuthContext)
  
    const handleSignOut = async () => {
        try {
          await signOut();
          Alert.alert("Signed out successfully");
        } catch (error) {
          console.error("Error signing out", error);
        }
      };


  return (
    <View style = {{ flex :1 , alignItems : 'center', justifyContent : 'center'}}>
            <OrangeButton text={'Logout'} onPress={handleSignOut}/>
    </View>
  );
};
