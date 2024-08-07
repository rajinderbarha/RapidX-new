import { Button, Card } from "@rneui/base";
import { useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ProfileContext } from "../../store/ProfileContext";
import { UpdateUser } from "../../../util/localAPIs";

export default function ProfileScreen() {
  const [userName, setUserName] = useState("");
  const { phNumber } = useContext(ProfileContext);

  async function nameUpdateHandler() {
    try {
      await UpdateUser(phNumber, userName);
      console.log("User updated");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  }

  return (
    <Card>
      <View style={{ margin: 25 }}>{/* <Avatar /> */}</View>
      <Text>Name</Text>
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 8, marginBottom: 15 }}
        onChangeText={setUserName}
        value={userName}
      />
      <Button onPress={nameUpdateHandler}>Update</Button>
    </Card>
  );
}
