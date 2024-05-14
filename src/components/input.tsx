import React, { useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { TextSmall, TextSmaller } from "./AppText";
import { RFValue } from "react-native-responsive-fontsize";

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
  secureTextEntry,
  ...restProps
}: InputProps): JSX.Element => {
  const [isVisible, setVisible] = useState(secureTextEntry);

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
            secureTextEntry={isVisible}
            {...restProps}
          />
          {secureTextEntry && (
            <TouchableOpacity onPress={() => setVisible(!isVisible)}>
              <Image
                source={
                  isVisible
                    ? require(`../assets/images/openEyeIcon.png`)
                    : require(`../assets/images/hidEyeIcon.png`)
                }
              />
            </TouchableOpacity>
          )}
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
    alignItems: "center",
    // borderRadius: 8,
    height: 40,
    flexDirection: "row",
  },
  textInput: {
    fontSize: RFValue(15),
    flex: 1,
    color: "white",
  },
});
