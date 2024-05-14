import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import { TextBig, TextNormal } from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import Input from "./input";
import PhoneInput from "./PhoneInput";

interface Props {
  close: () => void;
}

const AddReciepent: React.FC<Props> = (props) => {
  const { close } = props;
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
        <TextBig color="white" center>
          Add New Reciepent
        </TextBig>
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
                onChangeText={(txt) => onChange(txt)}
              />
            )}
          />

          <TouchableOpacity onPress={close}>
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
  );
};

export default AddReciepent;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  OTPContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: "20%",
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
