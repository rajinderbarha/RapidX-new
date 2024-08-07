import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SelectLocationButton from "./SelectLocationButton";
import { LocationContext } from "../../store/LocationContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import getAddress, { getCoords } from "../../../util/location";
import MyLocationButton from "../../ui/MyLocationButton";
import MapViewComponent from "./MapViewComponent";
import MapView from "react-native-maps";
import AddMarker from "./AddMarker";
import { TouchableOpacity } from "react-native";

export default function AutoComplete() {
  const ref = useRef<any>(null);
  const [placeId, setPlaceId] = useState("");
  const { pickedLocation ,setDropLocation, setPickedLocation, location, dropLocation, setPickupAddress } =
    useContext(LocationContext);
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef<MapView>(null);
  const [pickOnMap, setPickOnMap] = useState(false);


  useEffect(() => {
    console.log("pick On Map", pickOnMap)
  }, [pickOnMap]);

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
  const markerType = field === "pickup" ? "pickup" : "drop";

    function onMapPressHandler(){
      setPickOnMap(false)
      navigation.goBack()
    }

    return (
      <>
        {pickOnMap ? (
          <View style={styles.container}>
            <MapViewComponent reff={mapRef} markerType={markerType}>
              {field === "pickup" && pickedLocation && (
                <AddMarker location={pickedLocation} color="blue" image={null}/>
              )}
              {field === "drop" && dropLocation && (
                <AddMarker location={dropLocation} color="red" image={null}/>
              )}
            </MapViewComponent>
            <SelectLocationButton
              text="Confirm Location"
              iconName={""}
              onPress={onMapPressHandler}
            />
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.title}>{label}</Text>
                <TouchableOpacity onPress={() => setPickOnMap(true)}>
                  <Text style={styles.mapButton}>Pick on map</Text>
                </TouchableOpacity>
              </View>
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
                <MyLocationButton
                  onPress={fetchCurrentLocation}
                  style={{ top: 85, height: 30, width: 30 }}
                />
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
        )}
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
   mapButton : {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 6,
    color : 'blue'
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
