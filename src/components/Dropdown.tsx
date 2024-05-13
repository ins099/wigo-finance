import React, { useRef } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TextSmall, TextSmaller } from "./AppText";
import { Picker } from "@react-native-picker/picker";

interface DropDownProps {
  value: string;
  onChange: (arg?: any) => void;
  label: string;
  placeholder?: string;
  error?: string;
  containerStyle?: ViewStyle;
  dropDownContainerStyle?: ViewStyle;
  options: { label: string; value: string }[];
}

const CustomDropdown: React.FC<DropDownProps> = (props: DropDownProps) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    error,
    containerStyle,
    dropDownContainerStyle,
    options,
  } = props;

  const pickerRef = useRef(null);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && (
          <TextSmall color="#BBBBBB" textStyle={styles.label}>
            {label}
          </TextSmall>
        )}
        <View style={[styles.dateContainerStyle, dropDownContainerStyle]}>
          <Picker
            ref={pickerRef}
            selectedValue={value}
            placeholder={placeholder ?? "Select Value"}
            onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
            mode="dropdown"
            itemStyle={{ width: "100%", color: "white" }}
            dropdownIconColor={"white"}
            style={{
              color: "#ffffff",
            }}
          >
            {options &&
              options.length > 0 &&
              options.map((opt) => <Picker.Item key={opt.label} {...opt} />)}
          </Picker>
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

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  label: {},
  dateContainerStyle: {
    borderBottomWidth: 1,
    borderColor: "white",
    width: "100%",
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: "white",
  },
});
