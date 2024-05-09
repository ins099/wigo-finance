import React, { useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TextSmall, TextSmaller } from "./AppText";
import ReactNativePhoneInput from "react-native-phone-input";

interface PhoneInputProps extends TextInputProps {
  textInputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  error?: string | undefined;
}

const PhoneInput: React.FC<PhoneInputProps> = (props): JSX.Element => {
  const {
    textInputContainerStyle,
    textInputStyle,
    label,
    containerStyle,
    error,
    value,
    onChange,
    ...restProps
  } = props;

  const phoneRef = useRef(null);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && (
          <TextSmall color="#BBBBBB" textStyle={styles.label}>
            {label}
          </TextSmall>
        )}
        <View style={[styles.textInputContainer, textInputContainerStyle]}>
          <ReactNativePhoneInput
            ref={phoneRef}
            initialValue={value}
            onChangePhoneNumber={(result) => onChange(result)}
            initialCountry="us"
            style={[styles.textInput, textInputStyle]}
            textStyle={styles.textInput}
            textProps={{ maxLength: 15 }}
            autoFormat
          />
        </View>
      </View>
      {error && (
        <TextSmaller bold color={"red"}>
          {"* "}
          {error}
        </TextSmaller>
      )}
    </>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  label: {
    // marginBottom: 5,
  },
  textInputContainer: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "100%",
    alignSelf: "center",
    // borderRadius: 8,
    height: 40,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: "white",
  },
});
