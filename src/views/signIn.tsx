import React, { useMemo, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Button from "../components/button";

import { primaryDark, primaryLight } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";
import IconButton from "../components/iconButton";
import { Dimensions } from "react-native";
import { useAuth } from "../contexts/authContext";
import { loginUser } from "../services";
import useToast from "../hooks";
import { useSignInMutation } from "../redux/apis/auth";
import { useDispatch } from "react-redux";
import { setAppUser } from "../redux/reducers/user";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function SignIn({ navigation }: any): JSX.Element {
  const { setUser, setIsAuthenticated } = useAuth();
  const { fire } = useToast();
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();

  const [userDate, setUserDate] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const topPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === "android"
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  function handleChange(key: string, value: string) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  async function login() {
    const errorObj: any = {};

    if (!userDate.email.trim()) {
      errorObj.email = "Please Enter Email";
    }

    if (!userDate.password.trim()) {
      errorObj.password = "Please Enter Password";
    }

    if (Object.keys(errorObj).length > 0) {
      setErrors(errorObj);
      return;
    }

    const data = {
      Username: userDate.email,
      Password: userDate.password,
    };

    try {
      const res = (await signIn(data)) as any;
      console.log("LOGIN RESPONSE ++++++++++++", JSON.stringify(res, null, 1));
      if (res?.data) {
        fire(res?.data.message, "success");
        dispatch(setAppUser(res?.data));
        return
      }
      fire(res?.error?.data);
      // const user = await loginUser(data);
      // if (user?.Status && user?.Status === 999 && user?.Data) {
      //   fire(user?.Data);
      //   return;
      // }
      // setUser(user);
      // setIsAuthenticated(true);
    } catch (error: any) {
      fire(error.message);
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <LinearGradient
          useAngle={true}
          angle={185}
          colors={[primaryDark, primaryLight]}
          style={globalStyles.container}
        >
          <SafeAreaView
            style={{
              ...globalStyles.container,
              ...globalStyles.safeAreaContainer,
              ...{ maxWidth: "100%" },
            }}
          >
            <View
              style={{
                ...styles.contentContainer,
                ...topPadding,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
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
                  <View style={{ marginLeft: 8 }}>
                    <Image
                      style={{
                        width: windowWidth / 6,
                        height: windowWidth / 5,
                        marginVertical: 15,
                      }}
                      resizeMode="contain"
                      source={require("../assets/images/logo.png")}
                    />
                    <Text
                      style={{
                        fontSize: windowHeight / 30,
                        fontWeight: "500",
                        color: "#FFFFFF",
                      }}
                    >
                      Sign In
                    </Text>
                  </View>
                </View>

                <Image
                  style={{ width: windowWidth / 2.1 }}
                  resizeMode="contain"
                  source={require("../assets/images/authLogo.png")}
                />
              </View>

              <View style={{ width: "100%", marginTop: windowHeight / 20 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    ...(errors.email ? { borderColor: "red" } : {}),
                  }}
                  placeholder="Email ID"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  onChangeText={(text: string) => handleChange("email", text)}
                  value={userDate.email}
                />
                {errors.email ? (
                  <View style={{ marginTop: 4 }}>
                    <Text style={{ color: "red" }}>{errors.email}</Text>
                  </View>
                ) : null}
                <View style={{ position: "relative" }}>
                  {showPassword ? (
                    <>
                      <TextInput
                        style={{
                          ...styles.input,
                          marginTop: windowHeight / 25,
                          ...(errors.email ? { borderColor: "red" } : {}),
                        }}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("password", text)
                        }
                        value={userDate.password}
                      />
                      <TouchableOpacity
                        style={{
                          width: 20,
                          position: "absolute",
                          right: 0,
                          bottom: 8,
                        }}
                        onPress={() => setShowPassword(false)}
                      >
                        <Image
                          source={require("../assets/images/openEyeIcon.png")}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={{
                          ...styles.input,
                          marginTop: windowHeight / 25,
                          ...(errors.email ? { borderColor: "red" } : {}),
                        }}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("password", text)
                        }
                        value={userDate.password}
                      />
                      <TouchableOpacity
                        style={{
                          width: 20,
                          position: "absolute",
                          right: 0,
                          bottom: 8,
                        }}
                        onPress={() => setShowPassword(true)}
                      >
                        <Image
                          source={require("../assets/images/hidEyeIcon.png")}
                          resizeMode="contain"
                          style={{
                            width: "100%",
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                {errors.password ? (
                  <View style={{ marginTop: 4 }}>
                    <Text style={{ color: "red" }}>{errors.password}</Text>
                  </View>
                ) : null}
              </View>
              <Link to={{ screen: "ForgetPassword" }} style={styles.forgetLink}>
                Forgot Password
              </Link>

              <View style={{ width: "100%" }}>
                <Button
                  title="Log in"
                  variant="dark-blue"
                  onPress={login}
                  isLoading={isLoading}
                />
              </View>
            </View>
            <Image
              resizeMode="contain"
              source={require("../assets/images/signInBg.png")}
              style={{ height: windowHeight / 3 }}
            />
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "flex-start",
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  forgetLink: {
    marginTop: windowHeight / 25,
    marginBottom: windowHeight / 10,
    textAlign: "center",
    color: "#FCF300",
    fontSize: windowHeight / 55,
    fontWeight: "500",
    width: "100%",
  },
});

export default SignIn;
