import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Alert, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { primaryDark } from "../constants/colors";
import useToast from "../hooks";
import { useSendFundMutation } from "../redux/apis/auth";
import { TextNormal } from "./AppText";
import OTPComponent from "./otpComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ConfirmPayment = (props: any) => {
  const { visible, setVisible, payInfo, onSendSuccess } = props;
  const { top } = useSafeAreaInsets();
  const [PinCode, setPinCode] = useState("");
  const { fire } = useToast();

  const [sendFund, { isLoading }] = useSendFundMutation();

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      setVisible(false);
    });
    return () => {
      sub.remove();
    };
  }, []);

  const onPressConfirm = async () => {
    if (!!PinCode) {
      const body = {
        FromWalletId: payInfo?.Wallet?.Id,
        ToUser: payInfo?.user?.Id,
        Amount: payInfo?.Amount,
        PinCode,
      };
      console.log(JSON.stringify(body));
      const response = await sendFund(body);
      console.log("====", JSON.stringify(response, null, 1));
      if (response?.data) {
        return onSendSuccess();
      }
      return fire("An Error occured");
    } else {
      Alert.alert("Error", "Please enter your pin code.");
    }
  };

  return (
    <Modal
      style={{
        margin: 0,
        height: "100%",
        width: "100%",
        top: top,
      }}
      visible={visible}
    >
      <LinearGradient colors={[primaryDark, primaryDark]} style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <View
            style={{
              ...styles.navContainer,
            }}
          >
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{ width: RFValue(20) }}
            >
              <Image
                style={{
                  width: RFValue(20),
                  height: RFValue(20),
                }}
                resizeMode="cover"
                source={require("../assets/images/leftIcon.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.textTitle}>Send Fund Confirm</Text>
            <View style={styles.formContainer}>
              <View style={styles.formItemContainer}>
                <TextNormal color="white" textStyle={{ fontWeight: "700" }}>
                  From Wallet:
                </TextNormal>
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {payInfo?.Wallet?.FiatSymbol}
                  </Text>
                </View>
              </View>
              <View style={styles.formItemContainer}>
                <TextNormal color="white" textStyle={{ fontWeight: "700" }}>
                  Amount:
                </TextNormal>
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {payInfo?.Amount}
                  </Text>
                </View>
              </View>
              <View style={styles.formItemContainer}>
                <TextNormal color="white" textStyle={{ fontWeight: "700" }}>
                  Reciepent:
                </TextNormal>
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {payInfo?.user?.Alias}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1.5, alignItems: "center" }}>
              <OTPComponent
                value={PinCode}
                onChange={function (arg: any): void {
                  setPinCode(arg);
                }}
                containerStyle={{ height: RFPercentage(16) }}
                showStyle={true}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  disabled={isLoading}
                  onPress={() => setVisible(false)}
                  style={{ ...styles.btn, backgroundColor: "#D8574A" }}
                >
                  <TextNormal color="white">Cancel</TextNormal>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={isLoading}
                  onPress={onPressConfirm}
                  style={{ ...styles.btn, backgroundColor: "#1E96FC" }}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <TextNormal color="white">Confirm</TextNormal>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "#2F3B71",
    height: windowHeight / 20,
    // alignItems: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: windowWidth / 20,
  },
  subContainer: {
    padding: 15,
    flex: 1,
  },
  textTitle: {
    // fontSize: windowWidth / 15,
    fontSize: RFPercentage(3),
    color: "#fff",
    fontWeight: "700",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
  formItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },

  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#2F3A70",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },

  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    marginHorizontal: 10,
    backgroundColor: "red",
    padding: 18,
    borderRadius: 25,
  },
});
