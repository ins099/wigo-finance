import React, { useEffect } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TextNormal } from "./AppText";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import OTPComponent from "./otpComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DropDown = ({
  data = [{ label: "Wallet 1", value: "wallet-1 " }],
  value,
}) => {
  return (
    <SelectDropdown
      data={data}
      defaultValue={value}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Select your wallet"}
            </Text>
            <AntDesign
              name={isOpened ? "up" : "down"}
              color={"white"}
              size={18}
              disabled
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const ConfirmPayment = (props) => {
  const { visible, setVisible } = props;
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      visible && setVisible(false);
    });
    return () => {
      sub.remove();
    };
  }, []);

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
                <DropDown />
              </View>
              <View style={styles.formItemContainer}>
                <TextNormal color="white" textStyle={{ fontWeight: "700" }}>
                  Amount:
                </TextNormal>
                <DropDown />
              </View>
              <View style={styles.formItemContainer}>
                <TextNormal color="white" textStyle={{ fontWeight: "700" }}>
                  Reciepent:
                </TextNormal>
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {"item.label"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1.5, alignItems: "center" }}>
              <OTPComponent
                value={""}
                onChange={function (arg: any): void {
                  throw new Error("Function not implemented.");
                }}
                containerStyle={{ height: RFPercentage(13) }}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={{ ...styles.btn, backgroundColor: "#D8574A" }}
                >
                  <TextNormal color="white">Cancel</TextNormal>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.btn, backgroundColor: "#1E96FC" }}
                >
                  <TextNormal color="white">Confirm</TextNormal>
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
