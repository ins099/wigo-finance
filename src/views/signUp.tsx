import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import Button from "../components/button";

import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import IconButton from "../components/iconButton";
import { CustomPicker } from "../components/pickerComp";
import RadioButton from "../components/radioButton";
import { primaryDark, primaryLight } from "../constants/colors";
import { Locations } from "../constants/countryData";
import { useAuth } from "../contexts/authContext";
import useToast from "../hooks";
import { useLazyVerifyEmailQuery, useSignupMutation } from "../redux/apis/auth";
import { useGetLocationsQuery } from "../redux/apis/general";
import { setAppUser } from "../redux/reducers/user";
import { globalStyles } from "../styles/globalStyles";
// import DropdownOne from '../components/dropdownOne';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function SignUp({ navigation }: any): JSX.Element {
  const { fire } = useToast();
  const { setIsAuthenticated } = useAuth();
  const [userDate, setUserDate] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    VerifyCode: "",
    VerifyId: "",
    agreePolicy: false,
    ParentCode: "",
    LocationId: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    VerifyCode: "",
    VerifyId: "",
    ParentCode: "",
    LocationId: "",
  });
  const [isLoadings, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showVerifyField, setShowVerifyField] = useState(false);
  const statusBarHeight: number = StatusBar.currentHeight ?? 0;

  const { data: LocationsArr = [], isError } = useGetLocationsQuery({});

  const [signup, { isLoading }] = useSignupMutation();
  const [sendVerificationCode] = useLazyVerifyEmailQuery();

  const dispatch = useDispatch();

  const topPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === "android"
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  function handleChange(key: string, value: string | boolean) {
    setUserDate({
      ...userDate,
      [key]: value,
    });
  }

  async function signUp() {
    const errorObj: any = {};

    if (!userDate.agreePolicy) {
      return alert("Please accept terms and policy.");
    }

    if (!userDate.email.trim()) {
      errorObj.email = "Please Enter Email";
    }

    if (!userDate.VerifyId) {
      return alert("Please verify your email.");
    }

    if (!userDate.VerifyCode) {
      errorObj.VerifyCode = "Please Enter Verification Code";
    }

    if (!userDate.LocationId) {
      errorObj.LocationId = "Please Select Location.";
    }

    if (!userDate.fullName.trim()) {
      errorObj.fullName = "Please Enter Full Name";
    }

    if (!userDate.password.trim()) {
      errorObj.password = "Please Enter Password";
    }

    if (!userDate.confirmPassword.trim()) {
      errorObj.confirmPassword = "Please Enter Confirm Password";
    }

    if (
      userDate.password &&
      userDate.confirmPassword &&
      userDate.password !== userDate.confirmPassword
    ) {
      errorObj.password = "Password did not match";
    }

    if (Object.keys(errorObj).length > 0) {
      setErrors(errorObj);
      return;
    }

    const data = {
      Username: userDate.email,
      FullName: userDate.fullName,
      Password: userDate.password,
      ConfirmPassword: userDate.confirmPassword,
      ParentCode: userDate.ParentCode,
      VerifyId: userDate.VerifyId,
      VerifyCode: userDate.VerifyCode,
      LocationId: userDate.LocationId,
    };

    try {
      // const user = await registerUser(data);

      // setUser(user);
      // setIsAuthenticated(true);
      const res = (await signup(data)) as any;
      if (res?.data) {
        fire(res?.data.message, "success");
        dispatch(setAppUser(res?.data));
      }
      fire(res?.error?.data);
    } catch (err: any) {
      fire(err.message);
    }
  }

  async function onPressVerifyEmail() {
    try {
      let res = await sendVerificationCode({ email: userDate.email });
      if (!res.isError) {
        console.log(
          "VERIFICATION RESPONSE ++++++",
          JSON.stringify(res.data, null, 1)
        );
        handleChange("VerifyId", res.data);
        setShowVerifyField(true);
        Alert.alert(
          "Success",
          `Verification code has beend sent to ${userDate.email}`
        );
      } else {
        Alert.alert("Error", "Somethin went wrong.");
      }
    } catch (error: any) {
      console.log("ERROR", error.message);
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
              ...{
                maxWidth: "100%",
                minHeight: windowHeight + windowHeight / 20,
              },
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
                        // height: 10,
                      }}
                      resizeMode="contain"
                      source={require("../assets/images/leftIcon.png")}
                    />
                  </IconButton>
                  <View style={{ marginLeft: 8 }}>
                    <Image
                      style={{
                        // width: 60,
                        // height: 70,
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
                      Sign Up
                    </Text>
                  </View>
                </View>

                <Image
                  style={{ width: windowWidth / 2.1 }}
                  resizeMode="contain"
                  source={require("../assets/images/authLogo.png")}
                />
              </View>

              <View style={{ width: "100%" }}>
                <View style={styles.emailContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email ID"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    onChangeText={(text: string) => handleChange("email", text)}
                    value={userDate.email}
                  />
                  <Text
                    onPress={onPressVerifyEmail}
                    disabled={userDate.email == "" || !!errors.email}
                    style={[
                      styles.verifyText,
                      {
                        color:
                          userDate.email == "" || errors.email
                            ? "lightgrey"
                            : "#FCF300",
                      },
                    ]}
                  >
                    Verify
                  </Text>
                </View>
                {errors.email ? (
                  <View style={{ marginTop: 4, paddingLeft: windowWidth / 20 }}>
                    <Text style={{ color: "red" }}>{errors.email}</Text>
                  </View>
                ) : null}

                <View style={styles.divider} />

                {showVerifyField && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Verification Code"
                      placeholderTextColor="rgba(255,255,255,0.8)"
                      onChangeText={(text: string) =>
                        handleChange("VerifyCode", text)
                      }
                      value={userDate.VerifyCode}
                    />
                    <View style={styles.divider} />
                  </>
                )}

                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <CustomPicker
                    dataArr={isError ? Locations : Locations}
                    selectedItem={userDate.LocationId}
                    onSelect={(val) => handleChange("LocationId", val)}
                    placeholder="Please select location"
                  />
                </View>
                <View style={styles.divider}></View>

                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  onChangeText={(text: string) =>
                    handleChange("fullName", text)
                  }
                  value={userDate.fullName}
                />
                <View style={styles.divider}></View>
                {errors.fullName ? (
                  <View style={{ marginTop: 4, paddingLeft: windowWidth / 20 }}>
                    <Text style={{ color: "red" }}>{errors.fullName}</Text>
                  </View>
                ) : null}
                <View style={{ position: "relative" }}>
                  {showPassword ? (
                    <>
                      <TextInput
                        style={{ ...styles.input }}
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
                          marginRight: windowWidth / 20,
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
                        style={{ ...styles.input }}
                        placeholder="Password"
                        secureTextEntry
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
                          marginRight: windowWidth / 20,
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
                <View style={styles.divider}></View>
                {errors.password ? (
                  <View style={{ marginTop: 4, paddingLeft: windowWidth / 20 }}>
                    <Text style={{ color: "red" }}>{errors.password}</Text>
                  </View>
                ) : null}

                <View style={{ position: "relative" }}>
                  {showPassword2 ? (
                    <>
                      <TextInput
                        style={{ ...styles.input }}
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("confirmPassword", text)
                        }
                        value={userDate.confirmPassword}
                      />
                      <TouchableOpacity
                        style={{
                          width: 20,
                          position: "absolute",
                          right: 0,
                          bottom: 8,
                          marginRight: windowWidth / 20,
                        }}
                        onPress={() => setShowPassword2(false)}
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
                        style={{ ...styles.input }}
                        placeholder="Confirm Password"
                        secureTextEntry
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        onChangeText={(text: string) =>
                          handleChange("confirmPassword", text)
                        }
                        value={userDate.confirmPassword}
                      />
                      <TouchableOpacity
                        style={{
                          width: 20,
                          position: "absolute",
                          right: 0,
                          bottom: 8,
                          marginRight: windowWidth / 20,
                        }}
                        onPress={() => setShowPassword2(true)}
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
              </View>
              <View style={styles.divider}></View>
              {errors.confirmPassword ? (
                <View style={{ marginTop: 4, paddingLeft: windowWidth / 20 }}>
                  <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
                </View>
              ) : null}

              <View style={styles.referralContainer}>
                <Text style={styles.referralText}>Id Referal</Text>
                <View style={styles.referral}>
                  <TextInput
                    style={styles.referralInput}
                    placeholderTextColor={"white"}
                    placeholder="Optional"
                    value={userDate.ParentCode}
                    onChangeText={(txt) => handleChange("ParentCode", txt)}
                  />
                </View>
              </View>

              <RadioButton
                isSelected={userDate.agreePolicy}
                onSelect={function (): void {
                  handleChange("agreePolicy", !userDate.agreePolicy);
                }}
                label={"Agree with privacy policy"}
                containerStyle={{ marginTop: 35 }}
              />

              <View style={{ width: "100%", marginTop: windowHeight / 16 }}>
                <Button
                  title="Continue"
                  variant="dark-blue"
                  onPress={signUp}
                  isLoading={isLoading}
                />
              </View>
            </View>
            {/* <Image
              resizeMode="contain"
              source={require("../assets/images/signInBg.png")}
              style={{ height: windowHeight / 10 }}
            /> */}
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
    paddingVertical: windowHeight / 90,
    // borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    marginTop: windowHeight / 35,
    paddingLeft: windowWidth / 20,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#fff",
    marginLeft: "5%",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifyText: {
    color: "#FCF300",
    fontWeight: "500",
    position: "absolute",
    right: 20,
    bottom: 15,
  },
  referralContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    height: "8%",
    width: "100%",
    maxHeight: 80,
  },
  referralText: {
    color: "white",
    fontSize: windowWidth / 28,
    fontWeight: "400",
  },
  referral: {
    marginTop: 10,
    backgroundColor: "#3274c0",
    borderRadius: 15,
    width: "100%",
    height: "80%",
    elevation: 10,
  },
  referralInput: {
    flex: 1,
    color: "white",
    fontSize: 20,
    paddingHorizontal: 20,
  },
});

export default SignUp;
