import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface IProps {
  variant?: 'white' | 'blue' | 'dark-blue';
  onPress?: () => void;
}

interface TransferCardProps {
  TransferData: {
    number: string;
    email: string;
    name: string;
    img: string;
  };
}

const TransferCard: React.FC<TransferCardProps> = ({ TransferData }) => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Image
        style={{
          width: windowWidth / 8,
        }}
        resizeMode="contain"
        source={require('../assets/images/pic1.png')}
      />
      <View style={styles.textWrap}>
        <Text style={styles.usertext1}>Erin Rhiel Madsen</Text>
        <Text style={styles.usertext2}>hanji@gmail.com</Text>
        <Text style={styles.usertext3}>+251 253 2533</Text>
      </View>
      <Image
        style={{
          width: windowWidth / 15,
        }}
        resizeMode="contain"
        source={require('../assets/images/TrashIcon.png')}
      />
      <View style={styles.btnWrap}>
        <Image
          style={{
            width: windowWidth / 18,
          }}
          resizeMode="contain"
          source={require('../assets/images/Downloadcirclefill2.png')}
        />
        <Text style={styles.btnText}>Send Money</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight / 12,
    marginTop: windowHeight / 50,
    borderRadius: windowWidth / 40,
    backgroundColor: '#2F3B71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth / 80,
  },
  textWrap: {},
  btnWrap: {
    flexDirection: 'row',
    borderRadius: windowWidth / 20,
    borderWidth: 1,
    alignItems: 'center',
    padding: windowWidth / 100,
    borderColor: '#A2D6F9',
  },
  btnText: {
    color: '#A2D6F9',
    fontSize: windowWidth / 32,
    fontWeight: '700',
  },
  usertext1: {
    color: '#fff',
    fontSize: windowWidth / 28,
    fontWeight: '700',
  },
  usertext2: {
    color: '#fff',
    fontSize: windowWidth / 30,
  },
  usertext3: {
    color: '#fff',
    fontSize: windowWidth / 30,
  },
});

export default TransferCard;
