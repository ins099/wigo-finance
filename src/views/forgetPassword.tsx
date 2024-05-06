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
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Button from "../components/button";

import { primaryDark, primaryLight } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconButton from "../components/iconButton";
import OTPComponent from "../components/otpComponent";
import { useForgotPasswordMutation } from "../redux/apis/auth";
import useToast from "../hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ForgetPassword({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const { fire } = useToast();

  const logoContainerPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === "android"
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [userDate, setUserDate] = useState({
    email: "",
    Language: "en",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  function handleChange(key: string, value: string) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  async function onPressSubmit() {
    const errorObj: any = {};

    if (!userDate.email.trim()) {
      errorObj.email = "Please Enter Email";
    }

    if (Object.keys(errorObj).length > 0) {
      setErrors(errorObj);
      return;
    }

    const data = {
      Email: userDate.email,
      Language: userDate.Language,
    };

    try {
      let res = await forgotPassword(data);
      console.log("====FOIRGOT===", JSON.stringify(res, null, 1));
      if (res?.data) {
        fire("Email Sent", "success");
        navigation.goBack();
      }
      throw new Error(res?.error?.data?.title);
    } catch (error: any) {
      fire(error?.message);
    }
  }

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
              <Text style={styles.textTitle}>Forget Password</Text>
              <Text style={styles.textDescription}>
                Please enter your email address to receive a link to reset your
                password.
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input }}
                  placeholder="Email ID"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  onChangeText={(text: string) => handleChange("email", text)}
                  value={userDate.email}
                />
              </View>
            </View>
            {errors.email ? (
              <View style={{ marginTop: 4, paddingLeft: windowWidth / 20 }}>
                <Text style={{ color: "red" }}>{errors.email}</Text>
              </View>
            ) : null}

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Submit"
                  variant="blue"
                  onPress={onPressSubmit}
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
    width: "100%",
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
    borderColor: "#fff",
    color: "#fff",
    marginTop: windowHeight / 35,
    width: "90%",
  },
});

export default ForgetPassword;
