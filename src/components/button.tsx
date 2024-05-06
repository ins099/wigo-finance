import React, { FC, ReactElement } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface IProps {
  title: string;
  isLoading?: boolean;
  variant?: "white" | "blue" | "dark-blue";
  onPress?: () => void;
  disabled?: boolean;
}

const Button: FC<IProps> = ({
  title,
  isLoading,
  disabled = false,
  variant = "blue",
  onPress = () => {},
}): ReactElement => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...(variant === "white"
          ? styles.buttonWhite
          : variant === "dark-blue"
          ? styles.buttonDarkBlue
          : {}),
      }}
      onPress={onPress}
      disabled={disabled ?? isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={{
            ...styles.buttonText,
            ...(variant === "white"
              ? styles.buttonTextWhite
              : variant === "dark-blue"
              ? styles.buttonTextDarkBlue
              : {}),
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#1E96FC",
    padding: 10,
    minHeight: 40,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWhite: {
    backgroundColor: "#fff",
  },
  buttonDarkBlue: {
    backgroundColor: "#182561",
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  buttonTextWhite: { color: "#072AC8" },
  buttonTextDarkBlue: { color: "#fff" },
});

export default Button;
