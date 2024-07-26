import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import {  Pressable, TouchableOpacity, View } from "react-native";




const TEXT= 'Where are you going ?'
export default function BottomModalContent(){
    const navigation = useNavigation() as any

    function handelPress(){
      navigation.navigate('Drop')
    };
    

    return (
        <View style={styles.root}>
          <Pressable
            style={({ pressed }) => [
              styles.input,
              pressed && { backgroundColor: "#c9c3c3" },
            ]}
            onPress={handelPress}
          >
            <View style={styles.locationContainer}>
              <Ionicons name="search" size={22} color={"black"} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: "grey",
                  fontWeight: "600",
                  fontSize: 16,
                  maxWidth: "85%",
                }}
              >
                {TEXT}
              </Text>
            </View>
    
          </Pressable>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      root: {
        // backgroundColor : '#e4e1395b',
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "center",
        // height : 48,
        alignItems: "center",
    
        // elevation : 1,
        zIndex: 1,
      },
    
      input: {
        height: 43,
        backgroundColor: "#ffffff",
        width: "87%",
        borderRadius: 25,
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 9,
        flexDirection: "row",
        marginLeft: 10,
        paddingHorizontal: 10,
        overflow: "hidden",
      },
  
      locationContainer: {
        flexDirection: "row",
        gap: 10,
        flex: 1,
        alignItems: "center",
      },
    });
    