import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SelectLocationButton from "./SelectLocationButton";
import { LocationContext } from "../../store/LocationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCoords } from "../../../util/location";

export default function AutoComplete() {
  const ref = useRef(null);
  const [placeId, setPlaceId] = useState("");
  const { setDropLocation, setPickedLocation } = useContext(LocationContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { field }: any = route.params;

  useEffect(() => {
    if (!placeId) return;

    const fetchCoordinates = async () => {
      const coords = await getCoords(placeId);
      const locationSetter =
        field === "pickup" ? setPickedLocation : setDropLocation;
      locationSetter({
        latitude: coords.lat,
        longitude: coords.lng,
      });
    };

    fetchCoordinates();
  }, [placeId]);

  function selectLocationHandler() {
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Where To</Text>
        <GooglePlacesAutocomplete
          ref={ref}
          styles={autocompleteStyles}
          placeholder="Enter a location"
          onPress={(data, details) => {
            const placeID = details?.place_id;
            placeID && setPlaceId(placeID);
          }}
          query={{
            key: "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q",
            language: "en",
            components: "country:in",
          }}
        />
      </View>
      <View>
        <SelectLocationButton
          style={{
            marginBottom: 18,
            height: 50,
            width: "95%",
            alignSelf: "center",
          }}
          TEXT="Select Location"
          onPress={selectLocationHandler}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 6,
  },
});

const autocompleteStyles = {
  container: {
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    paddingVertical: 8,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
};
