import React from "react";
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

interface InputProps extends TextInputProps {
  textInputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  error?: string | undefined;
}

const Input: React.FC<InputProps> = ({
  textInputContainerStyle,
  textInputStyle,
  label,
  containerStyle,
  error,
  ...restProps
}: InputProps): JSX.Element => {
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && (
          <TextSmall color="#BBBBBB" textStyle={styles.label}>
            {label}
          </TextSmall>
        )}
        <View style={[styles.textInputContainer, textInputContainerStyle]}>
          <TextInput
            style={[styles.textInput, textInputStyle]}
            placeholderTextColor={"#BBBBBB"}
            {...restProps}
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

export default Input;

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
    color:'white'
  },
});
