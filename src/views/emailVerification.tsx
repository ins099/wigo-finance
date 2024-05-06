import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';

import Button from '../components/button';

import { primaryDark, primaryLight } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';

import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../components/iconButton';
import OTPComponent from '../components/otpComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EmailVerification({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const logoContainerPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === 'android'
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  const [userDate, setUserDate] = useState({
    email: '',
    password: '',
    phone: '',
  });

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  function handleChange(key: string, value: string) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  return (
    <LinearGradient
      colors={[primaryDark, primaryDark]}
      style={globalStyles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={globalStyles.container}>
        <SafeAreaView
          style={{
            ...globalStyles.container,
            ...globalStyles.safeAreaContainer,
          }}>
          <View
            style={{
              position: 'absolute',
              left: windowWidth / 50,
              top: windowWidth / 20,
              zIndex: 100,
            }}>
            <IconButton onPress={() => navigation.goBack()}>
              <Image
                style={{
                  width: 18,
                }}
                resizeMode="contain"
                source={require('../assets/images/leftIcon.png')}
              />
            </IconButton>
          </View>
          <View
            style={{
              ...styles.logoContainer,
              ...logoContainerPadding,
            }}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('../assets/images/logoDark.png')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Enter Verification Code</Text>
            <Text style={styles.textDescription}>
              Please enter the 6 digit code sent to your registered email
              address.
            </Text>
          </View>

          <OTPComponent
            pin1={pin1}
            setPin1={setPin1}
            pin2={pin2}
            setPin2={setPin2}
            pin3={pin3}
            setPin3={setPin3}
            pin4={pin4}
            setPin4={setPin4}
            pin5={pin5}
            setPin5={setPin5}
            pin6={pin6}
            setPin6={setPin6}
          />

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Submit"
                variant="blue"
                onPress={() => {
                  navigation.navigate('ProfileScreenOne');
                }}
              />
            </View>
            <TouchableOpacity style={styles.resendCont}>
              <Text style={styles.resendText}>Resend</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth / 4.5,
  },
  textTitle: {
    fontSize: windowWidth / 15,
    color: '#fff',
    fontWeight: '700',
  },
  textContainer: {
    marginTop: 0,
    width: '90%',
  },
  textDescription: {
    marginTop: windowHeight / 50,
    fontSize: windowWidth / 26,
    lineHeight: 20,
    color: '#fff',
    fontWeight: '400',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 18,
  },
  buttonWrapper: {
    width: '90%',
    marginTop: 18,
  },
  resendCont: {
    marginTop: windowHeight / 30,
  },
  resendText: {
    fontWeight: '700',
    color: '#1E96FC',
  },
  input: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,
    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
    width: '90%',
  },
});

export default EmailVerification;
