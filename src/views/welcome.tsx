import React, { useMemo } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Button from '../components/button';

import { primaryDark, primaryLight } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Welcome({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const logoContainerPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === 'android'
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  return (
    <LinearGradient
      colors={[primaryDark, primaryLight]}
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
              ...styles.logoContainer,
              ...logoContainerPadding,
            }}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Welcome</Text>
          
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Sign In"
                variant="blue"
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Sign Up"
                variant="white"
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              />
            </View>
          </View>
          <View style={styles.otherAuthContainer}>
            <View style={styles.verticalDivider} />
            <Text style={styles.authText}>Or Continue with</Text>
            <View style={styles.verticalDivider} />
          </View>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/appleIcon.png')}
              />
            </View>
            <View style={styles.icon}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/fbIcon.png')}
              />
            </View>
            <View style={styles.icon}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/googleIcon.png')}
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
    fontSize: windowWidth / 16,
    color: '#fff',
    fontWeight: '500',
  },
  textContainer: {
    marginTop: windowHeight / 10,
    alignItems: 'center',
    width: '90%',
  },
  textDescription: {
    marginTop: windowHeight / 50,
    fontSize: windowWidth / 26,
    lineHeight: 20,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
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
  otherAuthContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
    width: '90%',
  },
  authText: {
    marginHorizontal: 16,
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
  },
  verticalDivider: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  iconWrapper: {
    flexDirection: 'row',
    width: windowWidth / 2.5,
    justifyContent: 'space-between',
    marginTop: windowHeight / 50,
  },
  icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: windowWidth / 10,
    height: windowWidth / 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth / 60,
  },
});

export default Welcome;
