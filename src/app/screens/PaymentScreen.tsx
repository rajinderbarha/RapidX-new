import { Text, TouchableHighlight, View } from "react-native";
import  RazorpayCheckout  from 'react-native-razorpay' ;
import { colors } from "../../../constants/colors";

export default function PaymentScreen(){
  return (
    <View>
        <TouchableHighlight onPress={() => {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_6tjQDUkOZcmRhZ', // Your api key
    amount: '5000',
    name: 'foo',
    prefill: {
      email: 'void@razorpay.com',
      contact: '9191919191',
      name: 'Razorpay Software'
    },
    theme: {color: colors.primary}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}}>
<Text>Hello</Text>
</TouchableHighlight>
    </View>
  );
};
