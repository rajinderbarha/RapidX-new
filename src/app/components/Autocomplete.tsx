import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SelectLocationButton from "./SelectLocationButton";
import { LocationContext } from "../../store/LocationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import getAddress, { getCoords } from "../../../util/location";
import MyLocationButton from "../../ui/MyLocationButton";

export default function AutoComplete() {
  const ref = useRef<any>(null);
  const [placeId, setPlaceId] = useState("");
  const { setDropLocation, setPickedLocation, location, setDropAddress, setPickupAddress } =
    useContext(LocationContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { field }: any = route.params;

  const query = useMemo(
    () => ({
      key: "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q",
      language: "en",
      components: "country:in",
    }),
    []
  );

  useEffect(() => {
    if (!placeId) return;

    const fetchCoordinates = async () => {
      try {
        const coords = await getCoords(placeId);
        const locationSetter =
          field === "pickup" ? setPickedLocation : setDropLocation;
        locationSetter({
          latitude: coords.lat,
          longitude: coords.lng,
        });
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
      }
    };

    fetchCoordinates();
  }, [placeId, field, setDropLocation, setPickedLocation]);

  function selectLocationHandler() {
    navigation.goBack();
  }

  async function fetchCurrentLocation() {
    if (location) {
      const currentLocation = await getAddress(
        location?.coords.latitude,
        location?.coords.longitude
      );
      ref.current?.setAddressText(currentLocation);
      setPickedLocation(location.coords);
      setPickupAddress(currentLocation);
    }
  }

  const label = field === "pickup" ? "From" : "Where to";

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{label}</Text>
        <GooglePlacesAutocomplete
          ref={ref}
          styles={autocompleteStyles}
          placeholder="Enter a location"
          onPress={(data, details = null) => {
            const placeID = details?.place_id;
            placeID && setPlaceId(placeID);
            console.log(details);
          }}
          query={query}
        />

        {field === "pickup" && (
          <MyLocationButton onPress={fetchCurrentLocation} />
        )}
      </View>
      <View>
        <SelectLocationButton
          iconName={""}
          style={styles.selectButton}
          text="Select Location"
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
  selectButton: {
    marginBottom: 18,
    height: 50,
    width: "95%",
    alignSelf: "center",
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
