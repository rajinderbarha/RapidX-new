import { View, StyleSheet, Text } from "react-native";
import CustomBottomModal from "./CustomBottomModal";
import OrangeButton from "../../ui/OrangeButton";
import { useMemo } from "react";

interface BottomModalProps {
    onChange: (index: number) => void;
    isFocused: boolean;
}

export default function ConfirmLocationModal({ isFocused, onChange }: BottomModalProps) {
    // Dummy data for distance and price
    const distance = "5 km";
    const price = "$10";

const snapPoints = useMemo(() => ["20%", "25%"], []);

    return (
        <CustomBottomModal isFocused={isFocused} onChange={onChange} snapPoints={snapPoints}>
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Distance</Text>
                        <Text style={styles.detailValue}>{distance}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Price</Text>
                        <Text style={styles.detailValue}>{price}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <OrangeButton text={'Book Ride'} onPress={() => { }} />
                </View>
            </View>
        </CustomBottomModal>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // alignItems: 'center',
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
        alignItems : 'center',
        justifyContent : 'center'
        
    },
});
