import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function OTPComponent({
  navigation,
  pin1,
  setPin1,
  pin2,
  setPin2,
  pin3,
  setPin3,
  pin4,
  setPin4,
  pin5,
  setPin5,
  pin6,
  setPin6,
}: any) {
  const pinref1: any = useRef(null);
  const pinref2: any = useRef(null);
  const pinref3: any = useRef(null);
  const pinref4: any = useRef(null);
  const pinref5: any = useRef(null);
  const pinref6: any = useRef(null);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.verifyText}>Verification Code</Text>
      <View style={styles.cont}>
        <TextInput
          ref={pinref1}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={pin1 => {
            setPin1(pin1);
            if (pin1 !== '') {
              pinref2.current.focus();
            }
          }}
          style={styles.otpInp}
        />
        <TextInput
          ref={pinref2}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={pin2 => {
            setPin2(pin2);
            if (pin2 !== '') {
              pinref3.current.focus();
            }
            if (pin2 === '') {
              pinref1.current.focus();
            }
          }}
          style={styles.otpInp}
        />
        <TextInput
          ref={pinref3}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={pin3 => {
            setPin3(pin3);
            if (pin3 !== '') {
              pinref4.current.focus();
            }
            if (pin3 === '') {
              pinref2.current.focus();
            }
          }}
          style={styles.otpInp}
        />
        <TextInput
          ref={pinref4}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={pin4 => {
            setPin4(pin4);
            if (pin4 !== '') {
              pinref5.current.focus();
            }
            if (pin4 === '') {
              pinref3.current.focus();
            }
          }}
          style={styles.otpInp}
        />
        <TextInput
          ref={pinref5}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={pin5 => {
            setPin5(pin5);
            if (pin5 !== '') {
              pinref6.current.focus();
            }
            if (pin5 === '') {
              pinref4.current.focus();
            }
          }}
          style={styles.otpInp}
        />
        <TextInput
          ref={pinref6}
          maxLength={1}
          keyboardType={'numeric'}
          onChangeText={pin6 => {
            setPin6(pin6);
            if (pin6 === '') {
              pinref5.current.focus();
            }
          }}
          style={styles.otpInp}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: windowHeight / 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: windowHeight / 40,
    paddingBottom: windowHeight / 30,
    borderRadius: windowWidth / 50,
    width: '92%',
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowWidth / 1.2,
  },
  otpInp: {
    width: windowWidth / 10,
    height: windowWidth / 9,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    textAlign: 'center',
    color: '#fff',
  },
  verifyText: {
    marginLeft: windowWidth / 20,
    color: '#fff',
    fontSize: windowWidth / 30,
  },
});

export default OTPComponent;
