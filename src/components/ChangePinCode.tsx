import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { TextBig, TextNormal } from "./AppText";
import { Controller, useForm } from "react-hook-form";
import OTPComponent from "./otpComponent";
import Button from "./button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

const ChangePinCode = ({ close }) => {
  const { control, handleSubmit } = useForm();

  return (
    <LinearGradient
      style={styles.sheetContainer}
      colors={["#072AC8", "#182561"]}
      locations={[0, 5]}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "flex-end" }}>
          <Entypo name="cross" color="white" size={25} />
        </View>
        <TextBig bold color="white" center>
          Set a new pin
        </TextBig>
        <Controller
          control={control}
          key="OldPin"
          name="OldPin"
          render={({ field: { value, onChange } }) => (
            <OTPComponent
              containerStyle={styles.OTPContainer}
              value={value}
              onChange={onChange}
              cellColor="#3046a8"
              label="Old Pin"
            />
          )}
        />
        <Controller
          control={control}
          key="NewPin"
          name="NewPin"
          render={({ field: { value, onChange } }) => (
            <OTPComponent
              containerStyle={styles.OTPContainer}
              value={value}
              onChange={onChange}
              cellColor="#3046a8"
              label="New Pin"
            />
          )}
        />
        <Controller
          control={control}
          key="ConfirmNewPin"
          name="ConfirmNewPin"
          render={({ field: { value, onChange } }) => (
            <OTPComponent
              containerStyle={styles.OTPContainer}
              value={value}
              onChange={onChange}
              label="ConfirmNewPin"
              cellColor="#3046a8"
            />
          )}
        />

        <TouchableOpacity
          style={{ ...styles.button, marginVertical: 15 }}
          onPress={close}
        >
          <LinearGradient
            colors={["#1E96FC", "#072AC8"]}
            style={{ flex: 1, ...styles.button }}
          >
            <TextNormal color="white">Change</TextNormal>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ChangePinCode;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  OTPContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "20%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: RFPercentage(30),
    alignSelf: "center",
    borderRadius: 20,
  },
});
