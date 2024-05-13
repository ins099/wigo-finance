import React, { useMemo, useState } from "react";
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
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Button from "../components/button";

import { primaryDark, primaryLight } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import IconButton from "../components/iconButton";
import OTPComponent from "../components/otpComponent";
import Input from "../components/input";
import { Controller, useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/apis/auth";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ChangePassword({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const { control, handleSubmit } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onPressSubmit = async (data: any) => {
    try {
      const response = await changePassword(data);
      console.log(
        "======RESPOINSE====",
        JSON.stringify(response?.data, null, 1)
      );
      //   navigation.navigate("SignIn");
    } catch (error: any) {
      console.log("CHANGE PASSWORD ERROR====0", error?.message);
    }
  };

  const logoContainerPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === "android"
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  return (
    <ScrollView>
      <LinearGradient
        colors={[primaryDark, primaryDark]}
        style={globalStyles.container}
      >
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={{ minHeight: windowHeight + windowHeight / 20 }}
        >
          <SafeAreaView
            style={{
              ...globalStyles.container,
              ...globalStyles.safeAreaContainer,
            }}
          >
            <View
              style={{
                position: "absolute",
                left: windowWidth / 50,
                top: windowWidth / 20,
                zIndex: 100,
              }}
            >
              <IconButton onPress={() => navigation.goBack()}>
                <Image
                  style={{
                    width: 18,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/leftIcon.png")}
                />
              </IconButton>
            </View>
            <View
              style={{
                ...styles.logoContainer,
                ...logoContainerPadding,
              }}
            >
              <Image
                style={styles.logo}
                resizeMode="contain"
                source={require("../assets/images/logoDark.png")}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Change Password</Text>
              <Text style={styles.textDescription}>
                Please enter the 6 digit code sent to your registered email
                address and new password to change it{" "}
              </Text>
            </View>
            <Controller
              control={control}
              key={"PinCode"}
              name="PinCode"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => <OTPComponent value={value} onChange={onChange} />}
            />

            <View
              style={{
                width: "80%",
              }}
            >
              <Controller
                control={control}
                key={"OldPassword"}
                name="OldPassword"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    secureTextEntry
                    placeholder="New Password"
                    textInputContainerStyle={{ height: 50 }}
                    value={value}
                    onChangeText={(val) => onChange(val)}
                  />
                )}
              />
              <Controller
                control={control}
                key={"NewPassword"}
                name="NewPassword"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    secureTextEntry
                    placeholder="Confirm Password"
                    textInputContainerStyle={{ height: 50 }}
                    value={value}
                    onChangeText={(val) => onChange(val)}
                  />
                )}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Submit"
                  variant="blue"
                  onPress={handleSubmit(onPressSubmit)}
                  isLoading={isLoading}
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: windowWidth / 4.5,
  },
  textTitle: {
    fontSize: windowWidth / 15,
    color: "#fff",
    fontWeight: "700",
  },
  textContainer: {
    marginTop: 0,
    width: "90%",
  },
  textDescription: {
    marginTop: windowHeight / 50,
    fontSize: windowWidth / 26,
    lineHeight: 20,
    color: "#fff",
    fontWeight: "400",
  },
  buttonsContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 18,
  },
  buttonWrapper: {
    width: "90%",
    marginTop: 18,
  },
  resendCont: {
    marginTop: windowHeight / 30,
  },
  resendText: {
    fontWeight: "700",
    color: "#1E96FC",
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,
    color: "#fff",
    marginTop: windowHeight / 35,
    width: "90%",
  },
});

export default ChangePassword;
