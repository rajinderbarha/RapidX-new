import RazorpayCheckout from 'react-native-razorpay';
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { colors } from "../../../constants/colors";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import LoadingCircle from '../../ui/LoadingCircle';
import { useContext, useEffect, useState } from 'react';
import { RideContext } from '../../store/RideContext';
import { LocationContext } from '../../store/LocationContext';

export default function PaymentScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { amount, profile } = route.params;
  const price = amount * 100;
  
  const [isProcessing, setIsProcessing] = useState(true);
  const { setPaymentIsDone } = useContext(RideContext);
  const { reset } = useContext(LocationContext);

  const options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    // key: process.env.RAZORPAY_API_KEY || 'rzp_test_6tjQDUkOZcmRhZ', // Use environment variable for API key
    key : 'rzp_test_6tjQDUkOZcmRhZ',
    amount: price,
    name: profile.name,
    order_id: '', // If you have an order id
    prefill: {
      email: profile.email,
      contact: profile.phoneNumber,
      name: 'Fuvay Tech'
    },
    theme: { color: colors.primary }
  };

  useEffect(() => {
    if (isProcessing) {
      RazorpayCheckout.open(options)
        .then((data) => {
          // Handle success
          Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`, [
            { text: 'OK', onPress: () => handleSuccess() }
          ]);
        })
        .catch((error) => {
          // Handle failure
          Alert.alert('Payment Failed', `Code: ${error.code} | Description: ${error.description}`, [
            { text: 'Retry', onPress: () => openRazorPay() },
            { text: 'Cancel', onPress: () => navigation.goBack() }
          ]);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  }, [isProcessing]);

  const handleSuccess = () => {
    navigation.goBack();
    setPaymentIsDone(true);
    reset();
  };

  const openRazorPay = () => {
    setIsProcessing(true); // Trigger payment again
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>{isProcessing ? 'Redirecting, please wait...' : 'Redirecting, please wait...'}</Text>
      {isProcessing ? (
        <LoadingCircle />
      ) : (
        <TouchableOpacity onPress={openRazorPay} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Retry Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
