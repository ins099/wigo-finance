import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ViewStyle,
} from "react-native";
import { TextNormal } from "./AppText";
import OTPTextView from "react-native-otp-textinput";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface OTPProps {
  value: string | number;
  onChange: (arg: any) => void;
  label?: string;
  cellColor?: string;
  numberOfInputs?: number;
  containerStyle?: ViewStyle;
  showStyle: boolean;
  textInputContainerStyle: ViewStyle;
}

function OTPComponent(props: OTPProps) {
  const {
    value,
    onChange,
    containerStyle,
    label = "Pin Code",
    numberOfInputs = 4,
    cellColor,
    showStyle = true,
    textInputContainerStyle,
  } = props;

  return (
    <View style={[showStyle && styles.main, containerStyle]}>
      {label && (
        <TextNormal
          color="white"
          textStyle={
            showStyle && { paddingLeft: "13%", marginVertical: 5 }
          }
        >
          {label}
        </TextNormal>
      )}
      <View style={[showStyle && styles.container, textInputContainerStyle]}>
        <OTPTextView
          containerStyle={{
            ...styles.textInputContainer,
          }}
          textInputStyle={[
            styles.roundedTextInput,
            cellColor && { backgroundColor: cellColor },
          ]}
          inputCount={numberOfInputs}
          inputCellLength={1}
          tintColor={"#A2D6F9"}
          defaultValue={value ?? ""}
          handleTextChange={(txt) => onChange(txt)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  main: {
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "90%",
    marginTop: "5%",
    padding: 5,
    height: "15%",
    // paddingVertical: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    // marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 0.7,
    borderBottomWidth: 1,
    borderColor: "#A2D6F9",
    color: "white",
    marginHorizontal: 8,
  },
});

export default OTPComponent;
