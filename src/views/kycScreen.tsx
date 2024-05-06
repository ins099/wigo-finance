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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../components/iconButton';
import OTPComponent from '../components/otpComponent';
import { PickerComp4 } from '../components/pickerComp';
import { CalendarPicker } from '../components/calendarPicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function KYCScreen({ navigation }: { navigation: any }): JSX.Element {
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

  function handleChange(key: string, value: string) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  return (
    <ScrollView>
      <LinearGradient
        colors={[primaryDark, primaryDark]}
        style={globalStyles.container}>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={{ minHeight: windowHeight + windowHeight / 16 }}>
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
              }}></View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Complete Your KYC:</Text>
            </View>

            <View style={styles.cardContainer}>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff' }}>
                <PickerComp4 />
              </View>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="ID Number"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange('password', text)}
                value={userDate.password}
              />

              <CalendarPicker />
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Continue"
                  variant="blue"
                  onPress={() => {
                    navigation.navigate('ProfileCompletion');
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </ScrollView>
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
    marginTop: windowHeight / 35,
    width: '92%',
  },

  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: windowHeight / 10,
    marginBottom: windowHeight / 20,
  },
  buttonWrapper: {
    width: '90%',
    marginTop: 18,
  },

  input: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
    paddingHorizontal: windowWidth / 50,
    // borderWidth: 1,
  },
  input2: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,

    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
  },

  headingCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '94%',
    marginTop: windowHeight / 20,
    paddingHorizontal: windowWidth / 50,
    // paddingVertical: windowWidth / 25,
    paddingBottom: windowWidth / 12,
    borderRadius: windowWidth / 50,
  },
});

export default KYCScreen;
