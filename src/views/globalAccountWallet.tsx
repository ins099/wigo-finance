import React, { useMemo, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Button from "../components/button";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CalendarPicker } from "../components/calendarPicker";
import Navbar from "../components/navbar";
import {
  PickerComp1,
  PickerComp2,
  PickerComp3,
} from "../components/pickerComp";
import { TransactionData2 } from "../constants/transactionData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function GlobalAccountWallet({ navigation }: { navigation: any }): JSX.Element {
  const statusBarHeight: number = StatusBar.currentHeight || 0;

  const [checked, setChecked] = React.useState(true);
  const logoContainerPadding = useMemo(() => {
    return {
      paddingTop:
        Platform.OS === "android"
          ? statusBarHeight + windowHeight / 70
          : windowHeight / 70,
    };
  }, [statusBarHeight]);

  const [userDate, setUserDate] = useState({
    email: "",
    password: "",
    phone: "",
    phone2: "",
    name: "",
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
      style={globalStyles.container}
    >
      <ScrollView>
        <Navbar navigation={navigation} />
        <SafeAreaView
          style={{
            ...globalStyles.container,
            ...globalStyles.safeAreaContainer,
            ...styles.spacing,
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Your Profile</Text>
          </View>

          <View style={styles.cardWrap}>
            <View style={styles.topwrap}>
              <Text style={styles.heading}>Account Balance</Text>
              <Text style={styles.idText}>Acc ID: 55502220</Text>
            </View>
            <View style={styles.midWrap}>
              <Image
                style={{
                  width: windowWidth / 10,
                }}
                resizeMode="contain"
                source={require("../assets/images/walletIcon.png")}
              />
              <Text style={styles.midText}>$ 5,300 USD</Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <LinearGradient
                colors={["#072AC8", "#1E96FC"]}
                style={styles.cardContainer}
              >
                <Image
                  style={{
                    width: windowWidth / 12,
                  }}
                  resizeMode="contain"
                  source={require("../assets/images/CollapseIcon.png")}
                />
                <Text style={styles.text1}>Add/Remove KYC Account</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.cardWrap}>
            <Text style={styles.detailHeading}>Account Details</Text>
            <View style={styles.detailWrap}>
              <Text style={styles.detailText}>Balance</Text>
              <View style={styles.detailWrapinner}>
                <Text style={styles.detailText2}>5,300</Text>
                <Text style={styles.detailText2}>USD</Text>
              </View>
            </View>
            <View style={styles.detailWrap}>
              <Text style={styles.detailText}>Routing Number</Text>
              <View style={styles.detailWrapinner}>
                <Text style={styles.detailText2}>2536945823</Text>
              </View>
            </View>
            <View style={styles.detailWrap}>
              <Text style={styles.detailText}>Account Type</Text>
              <View style={styles.detailWrapinner}>
                <Text style={styles.detailText2}>Personal Account</Text>
              </View>
            </View>
            <View style={styles.detailWrap}>
              <Text style={styles.detailText}>Creation Date</Text>
              <View style={styles.detailWrapinner}>
                <Text style={styles.detailText2}>25 March 2022</Text>
              </View>
            </View>
          </View>

          <View style={styles.statementWrap}>
            <Text style={styles.statementText}>Account Statement</Text>
            <View style={styles.statementWrapInner}>
              <Text style={styles.statementText2}>Get Statement</Text>
              <Image
                style={{
                  width: windowWidth / 16,
                }}
                resizeMode="contain"
                source={require("../assets/images/ImportIcon.png")}
              />
            </View>
          </View>
          {TransactionData2.map((data, i) => (
            <View key={i} style={styles.transactionWrap}>
              <View style={styles.leftWrap}>
                <View style={styles.iconWrap}>
                  {data.icon === "up" ? (
                    <Image
                      style={{
                        width: windowWidth / 12,
                      }}
                      resizeMode="contain"
                      source={require("../assets/images/Downloadcirclefill.png")}
                    />
                  ) : (
                    <Image
                      style={{
                        width: windowWidth / 12,
                      }}
                      resizeMode="contain"
                      source={require("../assets/images/Loadcirclefill.png")}
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.transactionText}>Fund Added</Text>
                  <Text style={styles.fee}>Card Set up fee</Text>
                  <Text style={styles.transactionDate}>{data.date}</Text>
                </View>
              </View>
              <View>
                <View style={styles.flagWrap}>
                  <Text style={styles.currency}>Currency</Text>
                  <Image
                    style={{
                      width: windowWidth / 18,
                      marginLeft: windowWidth / 50,
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/flag.png")}
                  />
                </View>
                <Text style={styles.state3}>Debit</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    ...styles.amount,
                    color: data.color,
                  }}
                >{`${data.amount}`}</Text>
                <Text style={styles.state3}>Balance: {data.balance}</Text>
              </View>
            </View>
          ))}

          <View style={styles.cardWrap}>
            <Text style={styles.detailHeading}>Personal Info:</Text>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Full name</Text>
              <TextInput
                style={styles.input}
                placeholder="John"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange("name", text)}
                value={userDate.name}
              />
            </View>

            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
              }}
            >
              <View style={styles.infoWrap}>
                <Text style={styles.detailTextdob}>Date of birth</Text>
                <CalendarPicker />
              </View>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Email Id</Text>
              <TextInput
                style={styles.input}
                placeholder="abc@"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange("email", text)}
                value={userDate.email}
              />
            </View>

            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "#fff",
              }}
            >
              <View style={styles.infoWrap}>
                <Text style={styles.mbc}>Mobile country code</Text>
                <PickerComp1 />
              </View>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.detailText}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="523625222"
                keyboardType="numeric"
                placeholderTextColor="rgba(255,255,255,0.8)"
                onChangeText={(text: string) => handleChange("phone", text)}
                value={userDate.phone}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonWrapper}>
                <Button title="Save Change" variant="blue" />
              </View>
            </View>
          </View>

          <View style={styles.cardWrap}>
            <View style={styles.headingCont}>
              <Image
                source={require("../assets/images/locationIcon.png")}
                resizeMode="contain"
                style={{
                  width: windowWidth / 24,
                  marginRight: windowWidth / 60,
                }}
              />
              <Text style={styles.cardText}>Billing address</Text>
            </View>

            <View style={styles.doubleWrap}>
              <View
                style={{
                  width: "48%",
                  borderBottomColor: "#fff",
                }}
              >
                <View style={styles.infoWrap}>
                  <Text style={styles.countryText}>Country</Text>
                  <PickerComp2 />
                </View>
              </View>

              <View style={styles.infoWrap2}>
                <Text style={styles.detailText}>ZIP Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1400"
                  maxLength={6}
                  keyboardType="numeric"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  onChangeText={(text: string) =>
                    handleChange("password", text)
                  }
                  value={userDate.email}
                />
              </View>
            </View>

            <View
              style={{
                width: "100%",
                borderBottomColor: "#fff",
              }}
            >
              <View style={styles.infoWrap}>
                <Text style={styles.cityText}>City</Text>
                <PickerComp3 />
              </View>

              <View style={styles.infoWrap}>
                <Text style={styles.detailText}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="523625222"
                  keyboardType="numeric"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  onChangeText={(text: string) => handleChange("phone2", text)}
                  value={userDate.phone2}
                />
              </View>

              <View style={styles.headingCont3}>
                <Image
                  source={require("../assets/images/locationIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: windowWidth / 24,
                  }}
                />
                <View style={styles.headingCont2}>
                  <Text style={styles.cardText}>Delivery address</Text>
                  <TouchableOpacity
                    style={styles.subHeading}
                    onPress={() => setChecked(!checked)}
                  >
                    <View style={!checked ? styles.checkBox : styles.checkBox2}>
                      {checked && (
                        <Image
                          style={{
                            width: windowWidth / 25,
                          }}
                          resizeMode="contain"
                          source={require("../assets/images/tickIcon2.png")}
                        />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>Same address</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonsContainer}>
                <View style={styles.buttonWrapper}>
                  <Button title="Save Change" variant="blue" />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: windowWidth / 15,
    color: "#fff",
    fontWeight: "700",
  },
  textContainer: {
    width: "90%",
  },

  headingCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  headingCont3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: windowHeight / 40,
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: "100%",
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 25,
    borderRadius: windowWidth / 25,
    flexDirection: "row",
    alignItems: "center",
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 25,
    marginLeft: windowWidth / 30,
  },

  transactionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2F3B71",
    // width: windowWidth - windowWidth / 26,
    width: "96%",
    borderRadius: windowWidth / 60,
    paddingHorizontal: windowWidth / 60,
    paddingVertical: windowWidth / 30,
    marginTop: windowHeight / 40,
    alignItems: "center",
  },
  leftWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionText: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.4),
    fontWeight: "700",
  },
  fee: {
    color: "#fff",
    // fontSize: windowWidth / 36,
    fontSize: RFPercentage(1.4),
  },
  transactionDate: {
    color: "gray",
    // fontSize: windowWidth / 36,
    fontSize: RFPercentage(1.2),
  },
  currency: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.4),
  },
  amount: {
    color: "#FF4B38",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.4),
    fontWeight: "700",
  },
  amount2: {
    color: "#6FCF97",
    fontSize: windowWidth / 30,
    fontWeight: "700",
  },

  state3: {
    color: "#fff",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.4),
  },
  spacing: {
    marginBottom: windowHeight / 20,
  },
  cardWrap: {
    // width: windowWidth - windowWidth / 26,
    width: "99%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: windowWidth / 25,
    padding: windowWidth / 20,
    marginTop: windowHeight / 40,
  },
  topwrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    // fontSize: windowWidth / 22,
    fontSize: RFPercentage(2.5),
  },
  idText: {
    color: "#fff",
    // fontSize: windowWidth / 28,
    fontSize: RFPercentage(1.8),
  },
  midWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: windowWidth / 40,
  },
  midText: {
    color: "#fff",
    // fontSize: windowWidth / 16,
    fontSize: RFPercentage(2.9),
    fontWeight: "700",
    marginLeft: windowWidth / 40,
  },
  flagWrap: {
    flexDirection: "row",
  },
  statementWrap: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: windowHeight / 40,
  },
  statementWrapInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  statementText: {
    color: "#fff",
    fontSize: windowWidth / 26,
  },
  statementText2: {
    color: "#fff",
    fontSize: windowWidth / 30,
  },
  detailHeading: {
    color: "#fff",
    fontSize: windowWidth / 26,
  },
  detailWrap: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginTop: windowHeight / 100,
    paddingVertical: windowHeight / 100,
  },
  detailText: {
    color: "#BBBBBB",
    fontSize: windowWidth / 30,
  },
  detailTextdob: {
    color: "#BBBBBB",
    fontSize: windowWidth / 30,
    marginBottom: -windowWidth / 20,
  },
  mbc: {
    color: "#BBBBBB",
    fontSize: windowWidth / 30,
    marginBottom: -windowWidth / 18,
  },
  cityText: {
    color: "#BBBBBB",
    fontSize: windowWidth / 30,
    marginBottom: -windowWidth / 18,
  },
  countryText: {
    color: "#BBBBBB",
    fontSize: windowWidth / 30,
    marginBottom: -windowWidth / 18,
  },
  detailWrapinner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: windowHeight / 100,
  },
  detailText2: {
    color: "#fff",
    fontSize: windowWidth / 26,
  },
  input2: {
    fontWeight: "400",
    fontSize: windowWidth / 28,

    borderColor: "#fff",
    color: "#fff",

    width: "50%",
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  infoWrap: {
    marginTop: windowHeight / 40,
  },
  infoWrap2: {
    width: "48%",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: windowHeight / 30,
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 18,
  },
  headingCont2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: windowWidth / 60,
  },
  checkboxText: {
    color: "#FFC600",
    fontSize: windowWidth / 30,
    marginLeft: windowWidth / 100,
  },
  checkbox: {
    height: windowWidth / 20,
    width: windowWidth / 20,
    borderWidth: 1,
    borderRadius: windowWidth / 150,
    borderColor: "#FFC600",
  },
  cardText: {
    color: "#fff",
    // fontSize: windowWidth / 24,
    fontSize: RFPercentage(2.2),
    fontWeight: "700",
  },
  subHeading: {
    flexDirection: "row",
  },
  doubleWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  iconWrap: {
    backgroundColor: "#182561",
    borderRadius: windowWidth / 2,
    width: windowWidth / 10,
    alignItems: "center",
    marginRight: windowWidth / 100,
  },
  checkBox: {
    borderWidth: 1,
    height: windowWidth / 18,
    width: windowWidth / 18,
    marginRight: windowWidth / 90,
    borderColor: "#FFC600",
    borderRadius: windowWidth / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox2: {
    height: windowWidth / 18,
    width: windowWidth / 18,
    marginRight: windowWidth / 90,

    borderRadius: windowWidth / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC600",
  },
});

export default GlobalAccountWallet;
