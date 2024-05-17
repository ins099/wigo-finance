import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { LinearGradient } from "expo-linear-gradient";

import { primaryDark } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../components/navbar";
import { Reciepent } from "./recipients";
import { TransferData2 } from "../constants/transactionData";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/input";
import PhoneInput from "../components/PhoneInput";
import { TextNormal } from "../components/AppText";
import RBSheet from "react-native-raw-bottom-sheet";
import SendPayment from "../components/SendPayment";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const fontScale = PixelRatio.getFontScale();
// const getFontSize = size => size / fontScale;

function Transfers({ navigation }: { navigation: any }): JSX.Element {
  const { control, handleSubmit } = useForm();
  const sheetRef = useRef();
  const onPressSend = () => {
    sheetRef.current?.open()
  };
  const onPressDelete = () => {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={[primaryDark, primaryDark]} style={{ flex: 1 }}>
        <Navbar navigation={navigation} />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Make your Transfer</Text>
          </View>

          <Text style={styles.subtextTitle}>
            Make transfers to your peers by selecting existing recipients or
            adding new
          </Text>
          <View style={{ flex: 1 }}>
            <View style={styles.subHeading}>
              <Text style={styles.subHeadingText}>Recent Transfers</Text>
            </View>
            {TransferData2.slice(0, 3).map((item) => (
              <Reciepent
                item={item}
                onPressSend={onPressSend}
                onPressDelete={onPressDelete}
              />
            ))}
          </View>
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Controller
              control={control}
              key="EmailId"
              name="EmailId"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={(str) => onChange(str)}
                  placeholder="Email ID"
                />
              )}
            />
            <Controller
              control={control}
              key="FullName"
              name="FullName"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={(str) => onChange(str)}
                  placeholder="Full name of the account holder"
                />
              )}
            />
            <Controller
              control={control}
              key="PhoneNumber"
              name="PhoneNumber"
              render={({ field: { value, onChange } }) => (
                <PhoneInput
                  placeholder="Phone Number"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <TouchableOpacity onPress={() => {}}>
              <LinearGradient
                colors={["#1E96FC", "#072AC8"]}
                style={styles.button}
              >
                <TextNormal color="white">Search</TextNormal>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <RBSheet
        ref={sheetRef}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        keyboardAvoidingViewEnabled={true}
        height={500}
      >
        <SendPayment close={() => sheetRef?.current?.close()} />
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    // fontSize: windowWidth / 15,
    fontSize: RFPercentage(3),
    color: "#fff",
    fontWeight: "700",
  },
  textContainer: {
    width: windowWidth - windowWidth / 10,
  },
  subtextTitle: {
    color: "#A2D6F9",
    // fontSize: windowWidth / 30,
    fontSize: RFPercentage(1.7),
    width: windowWidth - windowWidth / 10,
  },
  subHeading: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    width: windowWidth - windowWidth / 12,
    paddingTop: windowWidth / 12,
    paddingBottom: windowWidth / 30,
  },
  subHeadingText: {
    color: "#fff",
    fontSize: windowWidth / 25,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flex: 1,
    // backgroundColor:'pink'
  },
  input: {
    fontWeight: "400",
    fontSize: windowWidth / 28,
    paddingVertical: 10,
    // paddingHorizontal: windowWidth / 30,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 15,
  },
});

export default Transfers;
