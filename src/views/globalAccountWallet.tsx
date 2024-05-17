import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { ActivityIndicator, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TextSmall } from "../components/AppText";
import FormService from "../components/FormService";
import Navbar from "../components/navbar";
import OTPComponent from "../components/otpComponent";
import { PROFILE_FIELDS } from "../constants/fields";
import useToast from "../hooks";
import {
  useChangePinCodeMutation,
  useGetWalletQuery,
  useUpdateWalletMutation,
} from "../redux/apis/auth";
import { useAppSelector } from "../redux/store";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function combineObjects(obj1, obj2) {
  // Create a new object to hold the combined result
  let combinedObj = {};

  // Iterate through the properties of obj1
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      // If the property exists in both objects and the values are different, take the value from obj2
      if (obj2.hasOwnProperty(key) && obj2[key] && obj1[key] !== obj2[key]) {
        combinedObj[key] = obj2[key];
      } else {
        // Otherwise, take the value from obj1
        combinedObj[key] = obj1[key];
      }
    }
  }

  return combinedObj;
}

function GlobalAccountWallet({ navigation }: { navigation: any }): JSX.Element {
  const [updateWallet, { isLoading: walletUpdtLoad, error }] =
    useUpdateWalletMutation();
  const { fire } = useToast();
  const {
    data: wallet = {},
    isLoading: walletLoading,
    error: walletError,
  } = useGetWalletQuery({});

  const [changePin, { isLoading: pinLoad }] = useChangePinCodeMutation();

  const [pinCode, setPinCode] = useState("");

  const user = useAppSelector((store) => store.user);

  const personalDetail = { ...user };

  async function onSubmit(id: string, data: any) {
    try {
      if (id == "address_detail") {
        console.log("ADDRESS DETAIl0", JSON.stringify(data, null, 1));
      } else if (id == "account_detail") {
        const body = combineObjects(wallet, data);
        let res = await updateWallet(body);
        console.log("RES LDJKJF=====", JSON.stringify(res, null, 1));
        if (res?.data) fire("Account Updated Successfully.", "success");
        return fire("Account Updated Successfully.", "success");
      } else {
        console.log("PERSONAL", JSON.stringify(data, null, 1));
      }
    } catch (error) {
      console.log("ERROROROROR====", error);
    }
  }

  const onSaveCode = async () => {
    if (!pinCode) fire("Please input pincode");
    try {
      const res = await changePin({
        OldPinCode: "",
        NewPinCode: pinCode,
        ConfirmNewPinCode: pinCode,
      });
      console.log(res);
      if (res?.data) {
        return fire("Pin code saved", "success");
      }
      return fire(res?.error?.data ?? "Something went wrong");
    } catch (error) {
      console.log("ERROR", error);
      return fire("Something went wrong");
    }
  };

  return (
    <LinearGradient
      colors={[primaryDark, primaryDark]}
      style={globalStyles.container}
    >
      <Navbar navigation={navigation} />
      <ScrollView>
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
          {PROFILE_FIELDS.map((item, index) => (
            <FormService
              item={item}
              onSubmit={onSubmit}
              key={index.toString()}
              defaultvals={{ ...wallet, ...personalDetail }}
              walletLoading={walletUpdtLoad}
            />
          ))}

          <View style={styles.cardWrap}>
            <OTPComponent
              containerStyle={{
                flex: 1,
                width: "100%",
                padding: "5%",
                // paddingHorizontal: '10%',
              }}
              showStyle={false}
              textInputContainerStyle={{
                paddingHorizontal: "7%",
                marginTop: 10,
              }}
              value={pinCode}
              onChange={function (arg: any): void {
                setPinCode(arg);
              }}
            />
            <TouchableOpacity onPress={onSaveCode} disabled={pinLoad}>
              <LinearGradient
                colors={["#1E96FC", "#072AC8"]}
                style={styles.cardContainer}
              >
                {pinLoad ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <TextSmall color="white">Save Changes</TextSmall>
                )}
              </LinearGradient>
            </TouchableOpacity>
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
    width: "100%",
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
    minHeight: 40,
    borderRadius: windowWidth / 25,
    alignItems: "center",
    justifyContent: "center",
    width: RFPercentage(37),
    marginVertical: 20,
  },

  text1: {
    color: "#fff",
    fontSize: windowWidth / 25,
    // marginLeft: windowWidth / 30,
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
    paddingHorizontal: 15,
  },
  cardWrap: {
    // width: windowWidth - windowWidth / 26,
    width: "99%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: windowWidth / 25,
    // padding: windowWidth / 20,
    alignItems: "center",
    height: 200,
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
