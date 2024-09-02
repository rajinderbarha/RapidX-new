import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Icon } from '@rneui/base';
import OrangeButton from '../../../ui/OrangeButton';

const RideDetailScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ride Detail */}
      <View style={styles.section}>
        <Text style={styles.heading}>Ride Detail</Text>
        <View style={styles.rideDetail}>
          <View style={styles.ridePoint}>
            <Icon name="radio-button-checked" type="material" color="green" />
            <View style={styles.rideInfo}>
              <Text style={styles.location}>Douglas Crescent Road</Text>
              <Text style={styles.subText}>Venie</Text>
              <Text style={styles.subText}>Mon 29, July 3:40PM</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.ridePoint}>
            <Icon name="radio-button-checked" type="material" color="red" />
            <View style={styles.rideInfo}>
              <Text style={styles.location}>Logan Avenue</Text>
              <Text style={styles.subText}>Aura</Text>
              <Text style={styles.subText}>Mon 29, July 3:55PM</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Drive Name */}
      <View style={styles.section}>
        <Text style={styles.heading}>Drive Name</Text>
        <View style={styles.driverDetail}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: 'https://randomuser.me/api/portraits/men/41.jpg',
            }}
          />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Gorge Jacob</Text>
            <Text style={styles.subText}>You Rated</Text>
            <Icon name="star" type="material" color="gold" />
          </View>
          <View style={styles.bikeInfo}>
            <Text style={styles.bikeType}>Bike Type: Mini</Text>
            <Text style={styles.subText}>G5-567-JH</Text>
          </View>
        </View>
      </View>

      {/* Feedback */}
      <View style={styles.section}>
        <Text style={styles.heading}>Feedback</Text>
        <View style={styles.feedback}>
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
        </View>
        <Text style={styles.subText}>Driver gave you 5 star rating</Text>
      </View>

      {/* Bill Detail */}
      <View style={styles.section}>
        <Text style={styles.heading}>Bill Detail</Text>
        <View style={styles.billDetail}>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Subtotal</Text>
            <Text style={styles.billText}>$50.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Tax</Text>
            <Text style={styles.billText}>$0.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.totalAmount}>Total Amount</Text>
            <Text style={styles.totalAmount}>$50.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Payment</Text>
            <Text style={styles.billText}>Credit card</Text>
          </View>
        </View>
      </View>

      {/* Get Invoice Button */}
      <OrangeButton text='Get Invoice' onPress={()=>{}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rideDetail: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
  },
  ridePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideInfo: {
    marginLeft: 10,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subText: {
    color: 'gray',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  driverDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverInfo: {
    marginLeft: 15,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bikeInfo: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  bikeType: {
    fontWeight: 'bold',
  },
  feedback: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  billDetail: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billText: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF6F00',
    borderRadius: 50,
    paddingVertical: 15,
  },
});

export default RideDetailScreen;
