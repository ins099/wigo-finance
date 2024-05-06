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
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import DocumentPicker from 'react-native-document-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileCompletion({ navigation }: { navigation: any }): JSX.Element {
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

  const selectDoc = async () => {
    // try {
    //   const doc = await DocumentPicker.pick();
    //   // type: [DocumentPicker.types.pdf],
    //   // allowMultiSelection: true,
    //   console.log(doc);
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log(err);
    //   } else console.log(err);
    // }
  };

  return (
    <LinearGradient
      colors={[primaryDark, primaryDark]}
      style={globalStyles.container}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={globalStyles.container}>
        <SafeAreaView
          style={{
            // ...globalStyles.container,
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
            <Text style={styles.textTitle}>
              Your profile is almost complete
            </Text>
          </View>

          <Text style={styles.textDescription}>
            Please Upload your ID and Address proof
          </Text>

          <Text style={styles.subheading}>Proof Of Id</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => selectDoc()}
              style={styles.cardContainerInner}>
              <View style={styles.cardTextWrap}>
                <Image
                  source={require('../assets/images/attachmentIcon.png')}
                  resizeMode="contain"
                  style={{
                    width: windowWidth / 20,
                  }}
                />
                <Text style={styles.cardText1}>Add Attachment</Text>
              </View>

              <Text style={styles.cardText2}>Such as, NRIC or Passport</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subheading}>Proof Of Id Proof</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => selectDoc()}
              style={styles.cardContainerInner}>
              <View style={styles.cardTextWrap}>
                <Image
                  source={require('../assets/images/attachmentIcon.png')}
                  resizeMode="contain"
                  style={{
                    width: windowWidth / 20,
                  }}
                />
                <Text style={styles.cardText1}>Add Attachment</Text>
              </View>

              <Text style={styles.cardText2}>Such as, utility bill</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Submit"
                variant="blue"
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              />
            </View>
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
    // fontSize: windowWidth / 15,
    fontSize: RFPercentage(3.5),
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
  textDescription: {
    // fontSize: windowWidth / 26,
    fontSize: RFPercentage(2),
    lineHeight: 20,
    color: '#fff',
    fontWeight: '400',
    marginTop: windowHeight / 50,
    alignItems: 'flex-start',
    width: '92%',
  },

  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '94%',
    marginTop: windowHeight / 50,
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 25,
    borderRadius: windowWidth / 50,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  cardContainerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subheading: {
    color: '#fff',
    width: '92%',
    marginTop: windowHeight / 20,
  },
  cardText1: {
    // fontSize: windowWidth / 26,
    fontSize: RFPercentage(2),
    color: 'white',
    marginLeft: windowWidth / 50,
  },
  cardText2: {
    // fontSize: windowWidth / 36,
    fontSize: RFPercentage(1.5),
    color: 'white',
  },
  cardTextWrap: {
    flexDirection: 'row',
  },
});

export default ProfileCompletion;
