import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View ,TouchableOpacity} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TextBig, TextNormal } from "./AppText";
import OTPComponent from "./otpComponent";
import { useChangePinCodeMutation } from "../redux/apis/auth";

const ChangePinCode = ({ close }) => {
  const { control, handleSubmit } = useForm();

  const [changePinCode, { isLoading }] = useChangePinCodeMutation();

  const onSubmit = async (data) => {
    try {
      const res = await changePinCode(data);
      console.log({ res });
      close();
    } catch (error) {
      console.log("ERROROOROR", error);
    }
  };

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
          key="OldPinCode"
          name="OldPinCode"
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
          key="NewPinCode"
          name="NewPinCode"
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
          key="ConfirmNewPinCode"
          name="ConfirmNewPinCode"
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
          onPress={handleSubmit(onSubmit)}
          // onPress={()=>alert('')}
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
