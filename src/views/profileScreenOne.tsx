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
  PixelRatio,
  Touchable,
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';

import Button from '../components/button';

import { primaryDark, primaryLight } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';

import { Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import IconButton from '../components/iconButton';
import OTPComponent from '../components/otpComponent';
import DropdownTwo from '../components/dropdownTwo';
import DropdownThree from '../components/dropdownThree';
import { PickerComp2, PickerComp3 } from '../components/pickerComp';
import { CalendarPicker } from '../components/calendarPicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileScreenOne({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const [checked, setChecked] = React.useState(true);

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
    name: '',
    lname: '',
    password: '',
    password2: '',
    phone: '',
    phone2: '',
    nationality: '',
    nid: '',
    zip: '',
    zip2: '',
  });

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
      <ScrollView>
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
            <Text style={styles.textTitle}>Complete Your Profile:</Text>
          </View>

          <View style={{ width: '92%' }}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input3}
                placeholder="First Name"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange('name', text)}
                value={userDate.name}
              />
              <TextInput
                style={styles.input3}
                placeholder="Last Name"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange('lname', text)}
                value={userDate.lname}
              />
            </View>
            <View
              style={{
                width: '100%',
                borderBottomColor: '#fff',
              }}>
              <CalendarPicker />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(text: string) => handleChange('password2', text)}
              value={userDate.password2}
            />

            <View style={{ position: 'relative' }}>
              <TextInput
                style={{ ...styles.input }}
                placeholder="Nationality"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) =>
                  handleChange('nationality', text)
                }
                value={userDate.nationality}
              />
            </View>

            <View style={{ position: 'relative' }}>
              <TextInput
                style={{ ...styles.input }}
                placeholder="NID"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange('nid', text)}
                value={userDate.nid}
              />
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.headingCont}>
              <Image
                source={require('../assets/images/locationIcon.png')}
                resizeMode="contain"
                style={{
                  width: windowWidth / 24,
                }}
              />
              <Text style={styles.cardText}>Billing address</Text>
            </View>
            <View style={styles.inputGroup}>
              <PickerComp2 />
              <TextInput
                style={styles.input3}
                keyboardType="numeric"
                maxLength={6}
                placeholder="Zip Code"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange('zip', text)}
                value={userDate.zip}
              />
            </View>
            <PickerComp3 />
            <TextInput
              style={styles.inputPhone}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(text: string) => handleChange('phone2', text)}
              value={userDate.phone2}
            />
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.headingCont}>
              <Image
                source={require('../assets/images/locationIcon.png')}
                resizeMode="contain"
                style={{
                  width: windowWidth / 24,
                }}
              />
              <View style={styles.headingCont2}>
                <Text style={styles.cardText}>Delivery address</Text>
                <TouchableOpacity
                  style={styles.subHeading}
                  onPress={() => setChecked(!checked)}>
                  <View style={!checked ? styles.checkBox : styles.checkBox2}>
                    {checked && (
                      <Image
                        style={{
                          width: windowWidth / 25,
                        }}
                        resizeMode="contain"
                        source={require('../assets/images/tickIcon2.png')}
                      />
                    )}
                  </View>

                  <Text style={styles.checkboxText}>Same address</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <PickerComp2 />
              <TextInput
                style={styles.input3}
                keyboardType="numeric"
                placeholder="Zip Code"
                maxLength={6}
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange('zip2', text)}
                value={userDate.zip2}
              />
            </View>

            <PickerComp3 />
            <TextInput
              style={styles.inputPhone}
              keyboardType="numeric"
              placeholder="Phone Number"
              placeholderTextColor="rgba(255,255,255,0.8)"
              onChangeText={(text: string) => handleChange('phone', text)}
              value={userDate.phone}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Continue"
                variant="blue"
                onPress={() => {
                  navigation.navigate('KYCScreen');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
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
    marginTop: windowHeight / 35,
    width: '90%',
  },

  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: windowHeight / 20,
  },
  buttonWrapper: {
    width: '90%',
    marginTop: 18,
  },
  resendCont: {
    marginTop: windowHeight / 30,
  },
  input: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
  },
  inputPhone: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
    paddingLeft: windowWidth / 22,
  },
  input2: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,

    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input3: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
    width: '48%',
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
    paddingVertical: windowWidth / 25,
    borderRadius: windowWidth / 50,
    paddingBottom: windowWidth / 15,
  },
  cardText: {
    color: '#fff',
    fontSize: windowWidth / 23,
    marginLeft: windowWidth / 50,
  },
  subHeading: {
    flexDirection: 'row',
  },
  checkbox: {
    height: windowWidth / 20,
    width: windowWidth / 20,
    borderWidth: 1,
    borderRadius: windowWidth / 150,
    borderColor: '#FFC600',
  },
  headingCont2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  checkboxText: {
    color: '#FFC600',
    fontSize: windowWidth / 30,
    marginLeft: windowWidth / 100,
  },
  checkBox: {
    borderWidth: 1,
    height: windowWidth / 18,
    width: windowWidth / 18,
    marginRight: windowWidth / 90,
    borderColor: '#FFC600',
    borderRadius: windowWidth / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox2: {
    height: windowWidth / 18,
    width: windowWidth / 18,
    marginRight: windowWidth / 90,
    borderRadius: windowWidth / 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC600',
  },
});

export default ProfileScreenOne;
