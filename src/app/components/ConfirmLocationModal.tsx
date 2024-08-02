import { View, StyleSheet, Text } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import OrangeButton from "../../ui/OrangeButton";
import { useContext, useMemo, useCallback } from "react";
import { LocationContext } from "../../store/LocationContext";

interface BottomModalProps {
    onChange: (index: number) => void;
    isFocused: boolean;
}

interface FareDetails {
    baseFare: number; // Base fare for the ride
    costPerKm: number; // Cost per kilometer
    distance: any; // Distance of the ride in kilometers
    additionalFees?: number; // Any additional fees (optional)
    discount?: number; // Any discount (optional)
}

export default function ConfirmLocationModal({ isFocused, onChange }: BottomModalProps) {
    const { distance } = useContext(LocationContext);
    const baseFare = 25;
    const costPerKm = 9;

    const calculateFare = useCallback(({
        baseFare,
        costPerKm,
        distance,
        additionalFees = 0,
        discount = 0,
    }: FareDetails): number => {
        const totalFare = baseFare + costPerKm * distance + additionalFees - discount;
        return Math.max(totalFare, 0);
    }, []);

    const price = useMemo(() => calculateFare({ baseFare, costPerKm, distance }).toFixed(0), [calculateFare, baseFare, costPerKm, distance]);

    const snapPoints = useMemo(() => ["20%", "25%"], []);

    return (
        <CustomBottomModal isFocused={isFocused} onChange={onChange} snapPoints={snapPoints}>
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Distance</Text>
                        <Text style={styles.detailValue}>{distance} km</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Price</Text>
                        <Text style={styles.detailValue}>{price} ₹</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <OrangeButton text="Book Ride" onPress={() => { }} />
                </View>
            </View>
        </CustomBottomModal>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailItem: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    detailLabel: {
        fontSize: 16,
        color: 'grey',
    },
    detailValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
